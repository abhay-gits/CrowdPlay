import redisClient from "./connectionToRedis.js";
const SONG_VOTES_KEY = "songVotes";
const SONG_NAME_KEY = "songName";
const USER_VOTES_KEY_PREFIX = "userVotes:";

export const upVoteSong = async (songData) => {
  const { songId, songName, userId } = songData;

  if (!songId || !userId || !songName) {
    throw new Error("Missing required fields");
  }

  const songIdStr = String(songId);
  const userIdStr = String(userId);
  const songNameStr = String(songName);
  const userVoteKey = `${USER_VOTES_KEY_PREFIX}${songIdStr}`;
  const songTimerKey = `songTimer:${songIdStr}`;

  try {
    const hasVoted = await redisClient.sIsMember(userVoteKey, userIdStr);

    if (hasVoted) {
      // Remove vote
      await redisClient.sRem(userVoteKey, userIdStr);
      const newScore = await redisClient.zIncrBy(SONG_VOTES_KEY, -1, songIdStr);

      if (newScore <= 0) {
        // Clean up completely
        await redisClient.zRem(SONG_VOTES_KEY, songIdStr);
        await redisClient.hDel(SONG_NAME_KEY, songIdStr);
        await redisClient.del(userVoteKey);
        await redisClient.del(songTimerKey);
        console.log(`Song ${songIdStr} removed - no votes remaining`);
        return 0;
      } else if (newScore === 1) {
        // Back to 1 vote, restart timer
        await redisClient.setEx(songTimerKey, 200, songIdStr);
        console.log(`Timer restarted for song ${songIdStr} - back to 1 vote`);
      }

      return Number(newScore);
    } else {
      // Add vote
      await redisClient.sAdd(userVoteKey, userIdStr);
      const newScore = await redisClient.zIncrBy(SONG_VOTES_KEY, 1, songIdStr);
      await redisClient.hSet(SONG_NAME_KEY, songIdStr, songNameStr);

      if (newScore === 1) {
        // First vote - set timer for 3 minutes
        await redisClient.setEx(songTimerKey, 180, songIdStr);
      } else if (newScore > 1) {
        // More than 1 vote - remove timer
        await redisClient.del(songTimerKey);
      }
      return Number(newScore);
    }
  } catch (err) {
    console.error("Error in voting for song:", err);
    throw err;
  }
};

// Enhanced cleanup function with better error handling
export const cleanupExpiredSongs = async () => {
  try {
    // Get all songs in the voting system
    const allSongs = await redisClient.zRangeWithScores(SONG_VOTES_KEY, 0, -1);

    for (const songData of allSongs) {
      const songId = songData.value;
      const votes = songData.score;
      const songTimerKey = `songTimer:${songId}`;

      // Check if timer exists
      const timerExists = await redisClient.exists(songTimerKey);

      if (votes === 1 && !timerExists) {
        // Song has 1 vote but no timer - this means it expired
        await redisClient.zRem(SONG_VOTES_KEY, songId);
        await redisClient.hDel(SONG_NAME_KEY, songId);
        await redisClient.del(`${USER_VOTES_KEY_PREFIX}${songId}`);
        // Emit to clients if needed
      }
    }
  } catch (err) {
    console.error("Error cleaning up expired songs:", err);
  }
};
const startSongCleanup = () => {
  setInterval(cleanupExpiredSongs, 300000);
};
startSongCleanup();

/* Get top N songs */

export const getSongs = async (topN = -1) => {
  try {
    console.log("event hit in songService getSongs");
    const songWithScore = await redisClient.zRangeWithScores(
      SONG_VOTES_KEY,
      0,
      topN,
      { REV: true }
    );
    const songIds = songWithScore.map((song) => song.value);
    if (songIds.length != 0) {
      const songName = await redisClient.hmGet(SONG_NAME_KEY, songIds);
      const response = songWithScore.map((song, index) => ({
        Id: song.value,
        score: song.score,
        name: songName[index],
      }));

      return response;
    } else return [];
  } catch (err) {
    console.error("Error in songService get Songs:", err);
    throw err;
  }
};

/* Delete Song after Playing */

export const deleteSong = async (songId) => {
  const userVoteKey = `${USER_VOTES_KEY_PREFIX}${songId}`;
  try {
    await Promise.all([
      redisClient.hDel(SONG_NAME_KEY, songId),
      redisClient.zRem(SONG_VOTES_KEY, songId),
      redisClient.del(userVoteKey),
    ]);
  } catch (error) {
    console.log("Error in deleteSong:", error.message);
  }
};
