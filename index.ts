import { TatsuClient } from "tatsu";
import { getFullRankings } from "./src/getRankings";

// Replace TATSU_API_KEY with your Tatsu API key
export const client: TatsuClient = new TatsuClient("TATSU_API_KEY_HERE");

// ID of the server you want to fetch the leaderboard of
const SERVER_ID = "SERVER_ID_HERE";

// Optional: Choose output file type csv or json
const FILE_TYPE = "csv";

// Optional: Output filename
const FILE_NAME = "server_rankings";

// Optional: If you want to start saving scores from a specific rank, edit here
// IMPORTANT! This will overwrite what is currently in the file if you do not change the FILE_NAME above
const FORCE_OFFSET_RANK = 0;

getFullRankings(SERVER_ID, FILE_TYPE, FILE_NAME, FORCE_OFFSET_RANK);