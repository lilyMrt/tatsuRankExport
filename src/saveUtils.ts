import { GuildRank } from "tatsu";

var fs = require("fs");

export type FILETYPE = "csv" | "json";

export function initFile(filename: string, filetype: FILETYPE): string {
  const filepath = `./output/${filename}.${filetype}`
  try {
    switch (filetype) {
      case "csv":
        createCsv(filepath);
        break;
      case "json":
        createJson(filepath);
        break;
    };
    return filepath;
  } catch (err) {
    console.log("Error initialising file: ", err)
    throw new Error("Error creating file")
  }
}

export function writeToFile(filepath: string, filetype: FILETYPE, content: GuildRank[]) {
  try {
    switch (filetype) {
      case "csv":
        appendCsv(filepath, content);
        break;
      case "json":
        appendJson(filepath, content);
        break;
    };
    return filepath;
  } catch (err) {
    console.log("Error initialising file: ", err)
    throw new Error("Error creating file")
  }
}

function createJson(file: string) {
  try {
    fs.writeFileSync(file, JSON.stringify([], null, 4), "utf-8");
    return 1;
  } catch (err) {
    console.log(err)
    return 0;
  }
}

function appendJson(file: string, ranks: any[]) {
  try {
    let currJson = fs.readFileSync(file, { encoding: "utf-8", flags: "w" });
    let newJson;
    if (currJson) {
      newJson = JSON.parse(currJson);
      newJson.push(...ranks)
    } else {
      newJson = ranks;
    }
    fs.writeFileSync(file, JSON.stringify(newJson, null, 4), { encoding: "utf-8", flags: "w" });
  } catch (err) {
    console.error(err);
  }
}

function createCsv(file: string) {
  try {
    fs.writeFileSync(file, "rank,score,user_id,guild_id\n", { encoding: "utf-8", flags: "w" });
    return 1;
  } catch (err) {
    console.log(err)
    return 0;
  }
}

function appendCsv(file: string, ranks: GuildRank[]) {
  const entryString = ranks.map((rank) => `${rank.rank},${rank.score},${rank.user_id},${rank.guild_id}\n`).join("")
  try {
    fs.appendFile(file, entryString, function (err: Error) {
      if (err) throw err;
    });
  } catch (err) {
    console.error(err);
  }
}