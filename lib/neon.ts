import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.EXPO_PUBLIC_NEON_DATABASE_URL;

if (!DATABASE_URL) {
    console.warn("Neon Database URL is missing. Please set EXPO_PUBLIC_NEON_DATABASE_URL in your .env file.");
}

// Initialize the Neon client in HTTP mode (works better in serverless/edge/client environments)
const sql = neon(DATABASE_URL || "");

export default sql;
