import { config } from "dotenv";
config();
const defaultOrigins = ["http://localhost:5173", "http://localhost:3000"];
const rawCorsOrigin = process.env.CORS_ORIGIN;
let CORS_ORIGIN = [...defaultOrigins];
if (rawCorsOrigin) {
    const parsedOrigins = rawCorsOrigin.split(",").map(o => o.trim()).filter(Boolean);
    CORS_ORIGIN = Array.from(new Set([...defaultOrigins, ...parsedOrigins]));
}
const getconfig = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "3000", 10),
    CORS_ORIGIN,
};
export default getconfig;
//# sourceMappingURL=config.js.map