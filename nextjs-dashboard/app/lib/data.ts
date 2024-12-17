import {
  PlayerField,
  MatchesTable,
  PlayerStandingsTable,
  UserProfileObject,
} from "./definitions";
import { DataTypes } from "./data.types";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function fetchMatches(): Promise<MatchesTable[]> {
  try {
    const res = await pool.query("SELECT * FROM matches");

    return res.rows as MatchesTable[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch match data.");
  }
}

export async function fetchLatestMatches(): Promise<MatchesTable[]> {
  try {
    const res = await pool.query(`
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
      LIMIT 5
    `);

    return res.rows as MatchesTable[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest matches.");
  }
}

export async function fetchCardData(): Promise<DataTypes.CardData> {
  try {
    const playersCountPromise = pool.query("SELECT COUNT(*) FROM users");
    const matchesCountPromise = pool.query("SELECT COUNT(*) FROM matches");
    const totalPointsScoredPromise = pool.query(
      "SELECT SUM(winner_points + loser_points) AS total FROM matches"
    );
    const topPlayerPromise: Promise<{
      rows: DataTypes.CardDataPlayerObject[];
    }> = pool.query(`
      SELECT users.id, users.username, COUNT(matches.winner_id) AS wins
      FROM users
      JOIN matches ON users.id = matches.winner_id
      GROUP BY users.id, users.username
      ORDER BY wins DESC
      LIMIT 1;
    `);

    const data = await Promise.all([
      playersCountPromise,
      matchesCountPromise,
      totalPointsScoredPromise,
      topPlayerPromise,
    ]);

    const numberOfPlayers = Number(data[0].rows[0].count ?? "0");
    const numberOfMatches = Number(data[1].rows[0].count ?? "0");
    const numberOfPoints = Number(data[2].rows[0].total ?? "0");
    const topPlayer = data[3].rows[0];

    return {
      numberOfPlayers,
      numberOfMatches,
      numberOfPoints,
      topPlayer,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredMatches(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const res = await pool.query(
      `
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
        winner.name ILIKE $1 OR
        winner.username ILIKE $1 OR
        loser.name ILIKE $1 OR
        loser.username ILIKE $1
      ORDER BY matches.date DESC
      LIMIT $2
      OFFSET $3
    `,
      [`%${query}%`, ITEMS_PER_PAGE, offset]
    );

    return res.rows as MatchesTable[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch matches.");
  }
}

export async function fetchPlayerStandings(currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const res = await pool.query(
      `
      SELECT
        username,
        profile_picture_url,
        id,
        SUM(wins) AS wins,
        SUM(loss) AS losses,
        SUM(PF) AS points_for,
        SUM(PA) AS points_against,
        elo
      FROM (
        (SELECT 
          users.id AS id,
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
          users.id AS id,
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
      GROUP BY username, elo, profile_picture_url, id
      ORDER BY wins DESC
      LIMIT $1
      OFFSET $2
    `,
      [ITEMS_PER_PAGE, offset]
    );

    return res.rows as PlayerStandingsTable[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player standings.");
  }
}

export async function fetchMatchesPages(query: string) {
  try {
    const res = await pool.query(
      `
      SELECT COUNT(*)
      FROM matches
      JOIN users AS winner ON matches.winner_id = winner.id
      JOIN users AS loser ON matches.loser_id = loser.id
      WHERE
        winner.name ILIKE $1 OR
        winner.username ILIKE $1 OR
        loser.name ILIKE $1 OR
        loser.username ILIKE $1
    `,
      [`%${query}%`]
    );

    const totalPages = Math.ceil(Number(res.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of matches.");
  }
}

export async function fetchPlayersMatchesPages(id: string) {
  try {
    const res = await pool.query(
      `
      SELECT COUNT(*)
      FROM matches
      JOIN users AS winner ON matches.winner_id = winner.id
      JOIN users AS loser ON matches.loser_id = loser.id
      WHERE
        winner.id = $1 OR
        loser.id = $1
    `,
      [id]
    );

    const totalPages = Math.ceil(Number(res.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of matches for this player.");
  }
}

export async function fetchPlayerById(id: string) {
  try {
    const res = await pool.query(
      `
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
        id = $1
      GROUP BY username, elo, id, profile_picture_url
      ORDER BY username DESC
    `,
      [id]
    );

    return res.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player.");
  }
}

export async function fetchPlayerByUsername(username: string) {
  try {
    const res = await pool.query(
      `
      SELECT
        username,
        id,
        profile_picture_url,
        email,
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
          users.email as email,
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
          users.email as email,
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
        username = $1
      GROUP BY username, elo, id, profile_picture_url, email
      ORDER BY username DESC
    `,
      [username]
    );

    return res.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player.");
  }
}

export async function fetchPlayerByEmail(email: string) {
  try {
    const res = await pool.query(
      `
      SELECT
        username,
        id,
        email,
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
          users.email AS email,
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
          users.email AS email,
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
        email = $1
      GROUP BY username, elo, id, profile_picture_url, email
      ORDER BY username DESC
    `,
      [email]
    );

    return res.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player.");
  }
}

export async function fetchPlayersPages(query: string) {
  try {
    const res = await pool.query(
      `
      SELECT COUNT(*)
      FROM users
      WHERE
        users.username ILIKE $1
    `,
      [`%${query}%`]
    );

    const totalPages = Math.ceil(Number(res.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of Players.");
  }
}

export async function fetchPlayers() {
  try {
    const res = await pool.query(`
      SELECT
        id,
        username,
        email,
        elo
      FROM users
      ORDER BY username ASC
    `);

    const players = res.rows as PlayerField[];
    return players;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all players.");
  }
}

export async function fetchPlayerList(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const res = await pool.query(
      `
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
        username ILIKE $1
      GROUP BY username, elo, id, profile_picture_url
      ORDER BY username DESC
      LIMIT $2
      OFFSET $3
    `,
      [`%${query}%`, ITEMS_PER_PAGE, offset]
    );

    return res.rows as PlayerStandingsTable[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player standings.");
  }
}
