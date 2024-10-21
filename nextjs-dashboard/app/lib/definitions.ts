// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserObject = {
  id: string;
  password: string;
  name: string;
  email: string;
  username: string;
  elo: number
};

export type MatchesTable = {
  id: string;
  date: string;
  winner_id: string;
  winner_username: string;
  winner_points: number;
  winner_profile_picture_url: string
  winner_elo: number
  loser_id: string
  loser_username: string;
  loser_points: number;
  loser_profile_picture_url: string
  loser_elo: number
};

export interface GroupedMatch extends MatchesTable {
  totalGames: number;
}

export type PlayerStandingsTable = {
  username: string;
  id: string;
  profile_picture_url: string;
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  elo: number;  
}

export type UserProfileObject = {
  username: string;
  id: string;
  profile_picture_url: string;
  email: string;
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  elo: number;  
}

export type PlayerField = {
  id: string;
  username: string;
  email: string;
  elo: number
};
