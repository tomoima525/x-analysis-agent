import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import z from "zod";

const searchQueries = z.object({
  queries: z.array(z.string()),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function prepareQuestion(
  question: string
): Promise<{ queries: string[] }> {
  const prompt = `I would like to see my hypothesis below is correct by observing people's post on X(Twitter). Can you come up with a search query(if necessary come up with multiple queries) to observe the results?\n\nhypothesis:\n${question}`;

  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a market researcher." },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(searchQueries, "queries"),
  });

  const queries = response.choices[0].message.parsed;
  return queries || { queries: [] };
}
