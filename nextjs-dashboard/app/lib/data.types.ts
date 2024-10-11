export namespace DataTypes {
    export interface PlayerObject {
        id: string
        username: string
        name: string
        email: string
        elo: number
    }

    export interface MatchObject {
        id: string
        date: string
        winnerId: string
        loserId: string
        winnerPoints: number
        loserPoints: number
    }

    export interface CardData {
        numberOfPlayers: number;
        numberOfMatches: number;
        numberOfPoints: number;
        topPlayer: {
          id: string;
          username: string;
          wins: number;
        };
    }

    export interface CardDataPlayerObject {
        id: string;
        username: string;
        wins: number;
    }
}