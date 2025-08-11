import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,  
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("connect", () => {
  console.log("Redis client connected successfully");
});

async function connectRedis() {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error; 
  }
}

export { client as default, connectRedis };
