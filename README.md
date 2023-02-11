# tatsuRanks

A simple tool to retrieve a JSON file of the Tatsu leaderboard in a server.

Tatsu bot and the owner of the API key must both be in the server for this to work.



### Notes: 
- You are limited 60 requests per minute, i.e. max 6000 member scores retrieved per minute. Large servers may take a long time to process. A timestamp and message is logged every 30 requests.

The frequency of these logs can be changed in `src/getRankings.ts:7` under LOG_FREQUENCY.


---


## How to use:

1. Obtain a Tatsu API key (t!apikey in a server with Tatsu)
2. Replace `SERVER_ID_HERE` and `TATSU_API_KEY`
3. _Optional:_ Change the output format in FILE_TYPE (csv or json) and the OUTPUT_FILE name
4. Run `npm i` to install dependencies
5. Run the script with `npm start` or `npm run script`
6. Output json or csv file will go to ./output/ or your specified location.


---


### Troubleshooting
If you encounter issues midway through, you can change the FORCE_OFFSET_RANK to start saving ranks and scores from that rank onward. Make sure you save the first output file first, or change the filename before running the script again.

Error code reference: https://dev.tatsu.gg/api/status_codes

Error code | Details | Fix
--- | --- | ---
401 | Unauthorized: Invalid or no API key provided | Update the key in index.ts `TatsuClient("KEY_HERE")` 
403 | User who owns the API key is not a member of the server | Join the server you want to fetch rankings for
404 | Unknown guild | Invalid SERVER_ID in index.ts or Tatsu is not present in the server



---


## Additional Info:


<https://dev.tatsu.gg/>


<https://github.com/TheEvilSocks/tatsu>
