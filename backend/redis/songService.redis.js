import redisClient from "../redis/connectionToRedis.js"

const SONG_VOTES_KEY = 'songVotes';
const SONG_NAME_KEY = 'songName';

/* Add new Song */

export const addNewSong = async (songId)=>{
    try {
        return await redisClient.zAdd(SONG_VOTES_KEY, { score: 1, value: songId });
    } catch (err) {
        console.error("Error adding new song:", err);
        throw err;
    }
}


/* Increment vote count */

export const upVoteSong = async (song) => {
    try {
        const newVoteCount = await redisClient.zIncrBy(SONG_VOTES_KEY, 1, song.id);
        await redisClient.hSet(SONG_NAME_KEY,song.id,song.name);
        return newVoteCount;
    } catch (err) {
        console.error("Error in upvoting:", err);
        throw err;
    }
}


/* Get top N songs */

export const getSongs = async (topN = -1)=>{
    try {
        const songWithScore = await redisClient.zRangeWithScores(SONG_VOTES_KEY, 0, topN, { REV: true});
        const songIds = songWithScore.map(song => song.value);  
        if(songIds.length != 0){
            const songName = await redisClient.hmGet(SONG_NAME_KEY,songIds);
            const response = songWithScore.map((song,index)=>({
                Id: song.value,
                score: song.score,
                name: songName[index],
            }));
            return response;
        }else return null;

    } catch (err) {
        console.error("Error in songService get Songs:", err);
        throw err;
    }
}

/* Delete Song after Playing */

export const deleteSong = async (songId) => {
    try {
        await Promise.all([
            redisClient.hDel(SONG_NAME_KEY, songId),
            redisClient.zRem(SONG_VOTES_KEY, songId)
        ])
        
    } catch (error) {
        console.log("Error in deleteSong:", error.message);
    }
};
