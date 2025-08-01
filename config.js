import dotenv from "dotenv";

dotenv.config();

export const apiPort = process.env.API_PORT || 8080;
export const publicUrl = process.env.PUBLIC_URL || "`http://localhost:8080";
export const apiKey = process.env.HELIUS_API_KEY;