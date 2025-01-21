import StagehandConfig from "./stagehand.config";
import {
  Stagehand,
  type BrowserContext,
  type Page,
} from "@browserbasehq/stagehand";
import { cookies } from "./auth";

async function crawlX({
  page,
  query,
}: {
  page: Page; // Playwright Page with act, extract, and observe methods
  query: string; // Query to search
}) {
  await page.goto(
    `https://x.com/search?q=-filter%3Areplies%20${query}&src=typed_query&f=live`,
    {
      waitUntil: "domcontentloaded",
    }
  );

  await page.waitForTimeout(2000);

  // Scroll a couple of times to get enough content
  // 10 scrolls => around 20 tweets
  const scrollCount = 10;
  for (let i = 0; i < scrollCount; i++) {
    await page.mouse.wheel(0, 10000 + 5000 * Math.random());

    // Wait for potential content to load
    await page.waitForTimeout(4000);
  }
  // Scrape tweets
  const posts = page.locator(
    '[data-testid="tweet"]:not(:has(div:has-text("Ad")))'
  );
  // Count the matching elements
  const count = await posts.count();
  console.log(`Number of tweets found: ${count}`);

  const tweets: string[] = [];

  for (let i = 0; i < count; i++) {
    const tweet = await posts
      .nth(i)
      .locator('[data-testid="tweetText"]')
      .allInnerTexts();
    tweets.push(tweet.flat().join("\n"));
  }

  console.log("Tweets ", tweets);
  return tweets;
}

export async function runResearch({ queries }: { queries: string[] }) {
  const stagehand = new Stagehand({
    ...StagehandConfig,
  });
  await stagehand.init();

  await stagehand.context.addCookies(cookies);
  const tweets: string[] = [];
  for (const query of queries) {
    const t = await crawlX({
      page: stagehand.page,
      query,
    });
    tweets.push(...t);
  }
  await stagehand.close();
  return tweets;
}
