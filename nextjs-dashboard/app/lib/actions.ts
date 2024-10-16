'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { calculateElo } from './elo';
 
const FormSchema = z.object({
    id: z.string(),
    winnerId: z.string({
      invalid_type_error: 'Please select a winning player.',
    }),
    loserId: z.string({
      invalid_type_error: 'Please select a losing player.',
    }),
    winnerPoints: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than the losing opponent.' }),
    winnerRank: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount 0 or greater.' }),
    loserPoints: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount 0 or greater.' }),
    loserRank: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount 0 or greater.' }),
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
 
const CreateMatch = FormSchema.omit({ id: true, date: true });

export async function createMatch(prevState: State, formData: FormData): Promise<State> {
  // Validate form using Zod
  const validatedFields = CreateMatch.safeParse({
    winnerId: formData.get('winningPlayerId'),
    loserId: formData.get('losingPlayerId'),
    winnerPoints: formData.get('winnerPoints'),
    winnerRank: formData.get('winnerRank'),
    loserPoints: formData.get('loserPoints'),
    loserRank: formData.get('loserRank')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Match.',
    };
  }

  // Prepare data for insertion into the database
  const { winnerId, loserId, winnerPoints, winnerRank, loserPoints, loserRank } = validatedFields.data;
  const date = new Date().toISOString();

  const { winNewElo, loseNewElo } = calculateElo(winnerRank, loserRank);

  // Insert data into the database within a transaction
  try {
      // Start the transaction
      await sql`BEGIN`;
      
      // Insert the match record
      await sql`
          INSERT INTO matches (date, winner_id, loser_id, winner_points, loser_points, winner_elo, loser_elo)
          VALUES (${date}, ${winnerId}, ${loserId}, ${winnerPoints}, ${loserPoints}, ${winnerRank}, ${loserRank})
      `;
      
      // Update the winner's elo
      await sql`
          UPDATE users SET elo = ${winNewElo} WHERE id = ${winnerId}
      `;
      
      // Update the loser's elo
      await sql`
          UPDATE users SET elo = ${loseNewElo} WHERE id = ${loserId}
      `;
      
      // Commit the transaction if all queries succeeded
      await sql`COMMIT`;

  } catch (error) {
      // Rollback the transaction if any query failed
      await sql`ROLLBACK`;
      return {
          message: 'Database Error: Failed to Create Match or Update Elo Ratings.',
      };
  }

  // Revalidate and redirect
  revalidatePath('/dashboard/matches');
  redirect('/dashboard/matches');
}

export async function deleteMatch(id: string) {

    try {
        await sql`DELETE FROM matches WHERE id = ${id}`;
        revalidatePath('/dashboard/matches');
    return { message: 'Deleted Match' };
    } catch(error) {
        return {
            message: 'Database Error: Failed to Delete Match.'
        };
    }
   
}

export async function saveProfilePhoto(email: string, profilePictureUrl: string) {

  try {
    await sql`
      UPDATE users
      SET profile_picture_url = ${profilePictureUrl}
      WHERE email = ${email}
    `;

    return profilePictureUrl
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
  
export async function register(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string 
    const username = formData.get('username') as string 
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    if(email && password) {
      // Check if user exists
      const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
      if (existingUser.rowCount > 0) {
        return 'User already exists.';
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      await sql`
        INSERT INTO users (name, email, username, password) 
        VALUES (${name}, ${email}, ${username}, ${hashedPassword})
      `;
      
      await signIn('credentials', { email, password });
    }
    
}