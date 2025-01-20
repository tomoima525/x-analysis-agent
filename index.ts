import * as readline from "readline";
import { prepareQuestion } from "./open-ai-service";
import * as dotenv from "dotenv";
import inquirer from "inquirer";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const answer = await new Promise<string>((resolve) => {
    rl.question("What do you like to analyze on X? ", resolve);
  });
  console.log(`You chose to analyze: ${answer}`);
  const r = await prepareQuestion(answer);
  const queries = r.queries;
  rl.close();

  const { selectedQueries } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedQueries",
      message: "Select the queries you want to include in your analysis:",
      choices: queries,
    },
  ]);

  console.log(
    `You selected the following queries for analysis: ${selectedQueries.join(
      ", "
    )}`
  );
}

main().catch(console.error);
