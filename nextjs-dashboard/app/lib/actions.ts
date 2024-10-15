'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
 
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
    loserPoints: z.coerce
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
      loserPoints: formData.get('loserPoints'),
    });
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Match.',
      };
    }
  
    // Prepare data for insertion into the database
    const { winnerId, loserId, winnerPoints, loserPoints } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    // const {winnerNewElo, loserNewElo} = getElo()
  
    // Insert data into the database
    try {
      await sql`
        INSERT INTO matches (date, winner_id, loser_id, winner_points, loser_points)
        VALUES (${date}, ${winnerId}, ${loserId}, ${winnerPoints}, ${loserPoints})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
  
    // If successful, revalidate and redirect
    revalidatePath('/dashboard/matches');
    redirect('/dashboard/matches');
}
  

// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(
//     id: string,
//     prevState: State,
//     formData: FormData,
//   ) {
//     const validatedFields = UpdateInvoice.safeParse({
//       customerId: formData.get('customerId'),
//       amount: formData.get('amount'),
//       status: formData.get('status'),
//     });
   
//     if (!validatedFields.success) {
//       return {
//         errors: validatedFields.error.flatten().fieldErrors,
//         message: 'Missing Fields. Failed to Update Invoice.',
//       };
//     }
   
//     const { customerId, amount, status } = validatedFields.data;
//     const amountInCents = amount * 100;
   
//     try {
//       await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//     } catch (error) {
//       return { message: 'Database Error: Failed to Update Invoice.' };
//     }
   
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
// }

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