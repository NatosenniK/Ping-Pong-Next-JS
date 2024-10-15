import { sql } from '@vercel/postgres';
import {
  PlayerField,
  CustomersTableType,
  InvoiceForm,
  LatestInvoiceRaw,
  MatchesTable,
  Revenue,
  PlayerStandingsTable,
} from './definitions';
import { formatCurrency } from './utils';
import { DataTypes } from './data.types';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData(): Promise<DataTypes.CardData> {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const playersCountPromise = sql`SELECT COUNT(*) FROM users`;
    const matchesCountPromise = sql`SELECT COUNT(*) FROM matches`;
    const totalPointsScoredPromise = sql`SELECT SUM(winner_points + loser_points) AS total FROM matches`;
    const topPlayerPromise: Promise<{ rows: DataTypes.CardDataPlayerObject[] }> = sql`SELECT users.id, users.username, COUNT(matches.winner_id) AS wins
      FROM users
      JOIN matches ON users.id = matches.winner_id
      GROUP BY users.id, users.username
      ORDER BY wins DESC
      LIMIT 1; `;

    const data = await Promise.all([
      playersCountPromise,
      matchesCountPromise,
      totalPointsScoredPromise,
      topPlayerPromise,
    ]);

    
    const numberOfPlayers = Number(data[0].rows[0].count ?? '0');
    const numberOfMatches = Number(data[1].rows[0].count ?? '0');
    const numberOfPoints = Number(data[2].rows[0].total ?? '0');
    const topPlayer = data[3].rows[0];

    return {
      numberOfPlayers,
      numberOfMatches,
      numberOfPoints,
      topPlayer,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredMatches(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const matches = await sql<MatchesTable>`
      SELECT
        matches.id,
        matches.winner_id,
        matches.loser_id,
        matches.date,
        matches.winner_points,
        matches.loser_points,
        matches.winner_elo,
        matches.loser_elo,
        winner.username AS winner_username,
        winner.name AS winner_name,
        loser.username AS loser_username,
        loser.name AS loser_name
      FROM matches
      JOIN users AS winner ON matches.winner_id = winner.id
      JOIN users AS loser ON matches.loser_id = loser.id
      WHERE
        winner.name ILIKE ${`%${query}%`} OR
        winner.username ILIKE ${`%${query}%`} OR
        loser.name ILIKE ${`%${query}%`} OR
        loser.username ILIKE ${`%${query}%`}
      ORDER BY matches.date DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;
  
    return matches.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch matches.');
  }

}

export async function fetchPlayerStandings(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const standings = await sql<PlayerStandingsTable>` 
      SELECT
        username,
        SUM(wins) AS wins,
        SUM(loss) AS losses,
        SUM(PF) AS points_for,
        SUM(PA) AS points_against,
        elo
      FROM (
        (SELECT 
          users.id AS user_id,
          users.username AS username,
          COUNT(matches.winner_id) AS wins,
          0 AS loss,
          SUM(matches.winner_points) AS PF,
          SUM(matches.loser_points) AS PA,
          users.elo AS elo
        FROM users
        JOIN matches ON matches.winner_id = users.id
        GROUP BY users.id)
        
        UNION ALL

        (SELECT 
          users.id AS user_id,
          users.username AS username,
          0 AS wins,
          COUNT(matches.loser_id) AS loss,
          SUM(matches.loser_points) AS PF,
          SUM(matches.winner_points) AS PA,
          users.elo AS elo
        FROM users
        JOIN matches ON matches.loser_id = users.id
        GROUP BY users.id)
      ) AS t
      GROUP BY username, elo
      ORDER BY wins DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return standings.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player standings.');
  }
}




export async function fetchMatchesPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM matches
      JOIN users AS winner ON matches.winner_id = winner.id
      JOIN users AS loser ON matches.loser_id = loser.id
      WHERE
        winner.name ILIKE ${`%${query}%`} OR
        winner.username ILIKE ${`%${query}%`} OR
        loser.name ILIKE ${`%${query}%`} OR
        loser.username ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchPlayers() {
  try {
    const data = await sql<PlayerField>`
      SELECT
        id,
        username,
        email,
        elo
      FROM users
      ORDER BY username ASC
    `;

    const players = data.rows;
    return players;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all players.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
