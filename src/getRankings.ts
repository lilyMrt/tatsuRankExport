import { FILETYPE, initFile, writeToFile } from "./saveUtils";
import { client } from "../index";
import { GuildRank } from "tatsu";
const { performance } = require('perf_hooks');

// Show progress log after every X requests
const LOG_FREQUENCY = 5;

// A maximum of 100 ranking objects are returned per request.
// https://dev.tatsu.gg/api/guild_rankings#get-all-time-guild-rankings
const CHUNK_SIZE = 100;

// Get the Guild Rankings of input server
export async function getFullRankings(serverId: string | number, filetype: FILETYPE, filename: string, forceOffsetRank: number) {
  if (!serverId || !Number(serverId)) {
    console.log("Invalid server ID provided in index.ts");
    return false;
  }
  const filepath = initFile(filename, filetype);

  if (!filepath) {
    console.log("Failed to create output file");
    return false;
  }
  console.log("Starting...");;
  var startTime = performance.now()

  let totalRankings: GuildRank[] = [];
  let tempRankings: GuildRank[] = [];
  let offset = forceOffsetRank / 100;

  try {
    tempRankings = await fetchRanks(serverId);
  } catch {
    return false
  }
  while (tempRankings.length > 0) {
    try {
      writeToFile(filepath, filetype, tempRankings);
    } catch (err) {
      console.log("Error writing to output file ", err)
      throw new Error("Error writing to file")
    }
    totalRankings.push(...tempRankings);
    offset += CHUNK_SIZE;
    try {
      tempRankings = await fetchRanks(serverId, offset);
    } catch {
      return false;
    }
    // Logs to track progress
    if (!Math.abs(offset % (CHUNK_SIZE * LOG_FREQUENCY))) {
      console.log(`Completed ${offset / CHUNK_SIZE} searches, ${totalRankings.length} members retrieved, ${Math.floor((performance.now() - startTime) / 1000)}s elapsed`)
    }
  }
  console.log(`Finished, result JSON in ${filepath}`)
  return true;
}

async function fetchRanks(id: string | number, offset?: number): Promise<GuildRank[]> {
  let tempRankings: GuildRank[];
  return client.getGuildRankings(`${id}`, offset)
    .then((response) => {
      tempRankings = response.rankings;
      return tempRankings;
    })
    .catch((err: Error) => {
      console.log("Error fetching ranks: ", err);
      throw new Error("Error fetching ranks");
    })
    .finally(() => { setTimeout(() => { }, 1000) })
}