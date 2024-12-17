"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { calculateElo } from "./elo";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Zod Schema for validating the form inputs
const FormSchema = z.object({
  id: z.string(),
  winnerId: z.string({
    invalid_type_error: "Please select a winning player.",
  }),
  loserId: z.string({
    invalid_type_error: "Please select a losing player.",
  }),
  winnerPoints: z.coerce.number().gt(0, {
    message: "Please enter an amount greater than the losing opponent.",
  }),
  winnerRank: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount 0 or greater." }),
  loserPoints: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount 0 or greater." }),
  loserRank: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount 0 or greater." }),
  date: z.string(),
});

export type State = {
  errors?: {
    winnerId?: string[];
    loserId?: string[];
    winnerPoints?: string[];
    loserPoints?: string[];
  };
  message?: string | null;
};

// Omitting unnecessary fields from the form schema
const CreateMatch = FormSchema.omit({ id: true, date: true });

// Function to create a match
export async function createMatch(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateMatch.safeParse({
    winnerId: formData.get("winningPlayerId"),
    loserId: formData.get("losingPlayerId"),
    winnerPoints: formData.get("winnerPoints"),
    winnerRank: formData.get("winnerRank"),
    loserPoints: formData.get("loserPoints"),
    loserRank: formData.get("loserRank"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Match.",
    };
  }

  const {
    winnerId,
    loserId,
    winnerPoints,
    winnerRank,
    loserPoints,
    loserRank,
  } = validatedFields.data;
  const date = new Date().toISOString();

  const { winNewElo, loseNewElo } = calculateElo(winnerRank, loserRank);

  // Database transaction for match creation
  try {
    await pool.query("BEGIN"); // Start transaction

    // Insert match
    await pool.query(
      `
      INSERT INTO matches (date, winner_id, loser_id, winner_points, loser_points, winner_elo, loser_elo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        date,
        winnerId,
        loserId,
        winnerPoints,
        loserPoints,
        winnerRank,
        loserRank,
      ]
    );

    // Update winner's elo
    await pool.query(
      `
      UPDATE users SET elo = $1 WHERE id = $2
      `,
      [winNewElo, winnerId]
    );

    // Update loser's elo
    await pool.query(
      `
      UPDATE users SET elo = $1 WHERE id = $2
      `,
      [loseNewElo, loserId]
    );

    await pool.query("COMMIT"); // Commit transaction
  } catch (error) {
    await pool.query("ROLLBACK"); // Rollback on error
    return {
      message: "Database Error: Failed to Create Match or Update Elo Ratings.",
    };
  }

  revalidatePath("/dashboard/matches");
  redirect("/dashboard/matches");
}

// Function to delete a match
export async function deleteMatch(id: string) {
  try {
    await pool.query("DELETE FROM matches WHERE id = $1", [id]);
    revalidatePath("/dashboard/matches");
    return { message: "Deleted Match" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Match.",
    };
  }
}

// Function to save profile photo
export async function saveProfilePhoto(
  email: string,
  profilePictureUrl: string
) {
  try {
    await pool.query(
      `
      UPDATE users
      SET profile_picture_url = $1
      WHERE email = $2
      `,
      [profilePictureUrl, email]
    );
    return profilePictureUrl;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

// Function to delete profile photo
export async function deleteProfilePhoto(email: string) {
  try {
    await pool.query(
      `
      UPDATE users
      SET profile_picture_url = null
      WHERE email = $1
      `,
      [email]
    );
    return null;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

// Function to authenticate a user
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// Function to register a new user
export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email && password) {
    // Check if user exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      return "User already exists.";
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query(
      `
      INSERT INTO users (name, email, username, password)
      VALUES ($1, $2, $3, $4)
      `,
      [name, email, username, hashedPassword]
    );

    await signIn("credentials", { email, password });
  }
}
