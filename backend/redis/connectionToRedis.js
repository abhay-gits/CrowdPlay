import { createClient } from 'redis';
import utils from "../utils/constants.utils.js";

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1);
    }
}

connectRedis();

export default client;