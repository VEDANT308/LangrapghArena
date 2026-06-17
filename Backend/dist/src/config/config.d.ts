type CONFIG = {
    readonly GOOGLE_API_KEY: string;
    readonly MISTRAL_API_KEY: string;
    readonly COHERE_API_KEY: string;
    readonly NODE_ENV: string;
    readonly PORT: number;
    readonly CORS_ORIGIN: string[];
};
declare const getconfig: CONFIG;
export default getconfig;
//# sourceMappingURL=config.d.ts.map