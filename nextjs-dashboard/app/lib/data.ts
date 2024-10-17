import { sql } from '@vercel/postgres';
import {
  PlayerField,
  MatchesTable,
  PlayerStandingsTable,
} from './definitions';
import { DataTypes } from './data.types';

export async function fetchMatches() {
  try {

    const data = await sql<MatchesTable>`SELECT * FROM matches`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch match data.');
  }
}

export async function fetchLatestMatches() {
  try {
    const data = await sql<MatchesTable>`
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
        winner.profile_picture_url AS winner_profile_picture_url,
        loser.username AS loser_username,
        loser.name AS loser_name,
        loser.profile_picture_url AS loser_profile_picture_url
      FROM matches
      JOIN users AS winner ON matches.winner_id = winner.id
      JOIN users AS loser ON matches.loser_id = loser.id
      ORDER BY matches.date DESC
      LIMIT 5`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest matches.');
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
        profile_picture_url,
        SUM(wins) AS wins,
        SUM(loss) AS losses,
        SUM(PF) AS points_for,
        SUM(PA) AS points_against,
        elo
      FROM (
        (SELECT 
          users.id AS user_id,
          users.profile_picture_url as profile_picture_url,
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
          users.profile_picture_url as profile_picture_url,
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
      GROUP BY username, elo, profile_picture_url
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
    throw new Error('Failed to fetch total number of matches.');
  }
}

export async function fetchPlayerById(id: string) {
  try {
    const player = await sql<PlayerStandingsTable>` 
      SELECT
        username,
        id,
        profile_picture_url,
        SUM(wins) AS wins,
        SUM(loss) AS losses,
        SUM(PF) AS points_for,
        SUM(PA) AS points_against,
        elo
      FROM (
        (SELECT 
          users.id AS id,
          users.username AS username,
          users.profile_picture_url as profile_picture_url,
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
          users.id AS id,
          users.username AS username,
          users.profile_picture_url as profile_picture_url,
          0 AS wins,
          COUNT(matches.loser_id) AS loss,
          SUM(matches.loser_points) AS PF,
          SUM(matches.winner_points) AS PA,
          users.elo AS elo
        FROM users
        JOIN matches ON matches.loser_id = users.id
        GROUP BY users.id)
      ) AS t
      WHERE
		  id = ${id}
      GROUP BY username, elo, id, profile_picture_url
      ORDER BY username DESC
    `;


    return player.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player.');
  }
}

export async function fetchPlayersPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM users
      WHERE
        users.username ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Players.');
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

export async function fetchPlayerList(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const standings = await sql<PlayerStandingsTable>` 
      SELECT
        username,
        id,
        profile_picture_url,
        SUM(wins) AS wins,
        SUM(loss) AS losses,
        SUM(PF) AS points_for,
        SUM(PA) AS points_against,
        elo
      FROM (
        (SELECT 
          users.id AS id,
          users.username AS username,
          users.profile_picture_url as profile_picture_url,
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
          users.id AS id,
          users.username AS username,
          users.profile_picture_url as profile_picture_url,
          0 AS wins,
          COUNT(matches.loser_id) AS loss,
          SUM(matches.loser_points) AS PF,
          SUM(matches.winner_points) AS PA,
          users.elo AS elo
        FROM users
        JOIN matches ON matches.loser_id = users.id
        GROUP BY users.id)
      ) AS t
      WHERE
		  username ILIKE ${`%${query}%`}
      GROUP BY username, elo, id, profile_picture_url
      ORDER BY username DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
      
    `;

    return standings.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player standings.');
  }
}

