import { config } from "dotenv";

config();

type CONFIG = {
    readonly GOOGLE_API_KEY: string;
    readonly MISTRAL_API_KEY: string;
    readonly COHERE_API_KEY: string;
};

function requireEnv(key: string): string {
    const val = process.env[key];
    if (!val) {
        console.error(`[Fatal Error] Missing required environment variable: ${key}`);
        process.exit(1);
    }
    return val;
}

const getconfig: CONFIG = {
    GOOGLE_API_KEY: requireEnv("GOOGLE_API_KEY"),
    MISTRAL_API_KEY: requireEnv("MISTRAL_API_KEY"),
    COHERE_API_KEY: requireEnv("COHERE_API_KEY"),
};

export default getconfig;