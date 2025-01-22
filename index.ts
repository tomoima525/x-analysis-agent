import * as readline from "readline";
import { prepareQuestion, runAnalysis } from "./open-ai-service";
import * as dotenv from "dotenv";
import inquirer from "inquirer";
import { runResearch } from "./browser-service";

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
  console.log(`Agent is preparing the queries for you...`);
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

  const tweets = await runResearch({ queries: selectedQueries });
  console.log("Agent is analyzing the tweets...");
  const analysis = await runAnalysis({
    question: answer,
    tweets: tweets,
  });
  console.log("Analysis result:\n", analysis);
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
