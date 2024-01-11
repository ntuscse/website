export interface Leaderboard {
    uuid: string; // uuid-v4
    title: string; 
    start_date: Date; // Or RFC3339 string? 2021-01-01T02:07:14Z
    end_date: Date; // Or RFC3339 string? 2021-01-02T02:07:14Z
}