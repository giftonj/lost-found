const cron = require("node-cron");
const mailer = require("./mailer");
const Post = require("../models/post");
const stringSimilarity = require("string-similarity");
require("dotenv").config();

let isRunning = false;

cron.schedule("* * * * *", async () => {
  if (isRunning) return;
  isRunning = true;

  console.log("Matcher job started...");

  try {
    const findLost = await Post.find({ type: "Lost", status: "active" }).populate("user");
    const findFound = await Post.find({ type: "Found", status: "active" }).populate("user");

    let matchCount = 0;

    for (const lost of findLost) {
      // Skip if already has matches
      const unmatchedFound = findFound.filter(
        f => !(lost.notifiedMatches?.includes(f._id))
      );

      if (!unmatchedFound.length) continue;

      // Compute similarity scores for all potential matches
      const scoredMatches = unmatchedFound.map(found => {
        const titleSim = stringSimilarity.compareTwoStrings(lost.title, found.title);
        const descSim = stringSimilarity.compareTwoStrings(lost.description, found.description);

        // Weighted score: 70% title, 30% description
        const score = titleSim * 0.7 + descSim * 0.3;

        return { found, score };
      });

      // Sort descending by score
      scoredMatches.sort((a, b) => b.score - a.score);

      // Pick the top match
      const bestMatch = scoredMatches[0];

      // Minimum threshold to avoid false positives
      const MIN_SCORE = 0.6;
      if (bestMatch.score >= MIN_SCORE) {
        matchCount++;
        console.log(`MATCH FOUND: Lost "${lost.title}" ↔ Found "${bestMatch.found.title}" (score: ${bestMatch.score.toFixed(2)})`);

        await mailer.sendMatchEmail(lost, bestMatch.found);

        // Update notifiedMatches arrays
        lost.notifiedMatches = lost.notifiedMatches || [];
        bestMatch.found.notifiedMatches = bestMatch.found.notifiedMatches || [];

        lost.notifiedMatches.push(bestMatch.found._id);
        bestMatch.found.notifiedMatches.push(lost._id);

        await lost.save();
        await bestMatch.found.save();
      }
    }

    console.log(`Matcher job completed. Total matches: ${matchCount}`);
  } catch (err) {
    console.error("Matcher job error:", err.message);
  } finally {
    isRunning = false;
  }
});