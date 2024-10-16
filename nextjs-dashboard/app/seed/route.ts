// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

// const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       username VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//       elo INT DEFAULT 1500
//     );
//   `;
// }

// async function seedMatches() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS matches (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       date TIMESTAMPTZ NOT NULL,
//       winner_id UUID REFERENCES users(id) ON DELETE CASCADE,
//       loser_id UUID REFERENCES users(id) ON DELETE CASCADE,
//       winner_points INT NOT NULL,
//       loser_points INT NOT NULL,
//       winner_elo INT NOT NULL,
//       loser_elo INT NOT NULL
//     );
//   `;
// }

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  });
  // try {
  //   await client.sql`BEGIN`;
  //   await seedUsers();
  //   await seedMatches();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Database seeded successfully' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}
