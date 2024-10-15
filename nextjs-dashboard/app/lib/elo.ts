export function calculateElo(winElo: number, loseElo: number, K = 32) {
    // Calculate the expected score for the winner
    const expectedWin = 1 / (1 + Math.pow(10, (loseElo - winElo) / 400));

    // Update ELO ratings based on the match result
    const winNewElo = winElo + K * (1 - expectedWin);  // Winner gains points
    const loseNewElo = loseElo - K * (1 - expectedWin); // Loser loses points

    return {
        winNewElo: Math.round(winNewElo),
        loseNewElo: Math.round(loseNewElo)
    };
}
