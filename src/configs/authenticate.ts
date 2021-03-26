import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../", ".env") });

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_ISS = process.env.JWT_ISS
export const JWT_AUD = process.env.JWT_AUD