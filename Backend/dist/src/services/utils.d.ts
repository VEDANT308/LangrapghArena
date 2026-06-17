/**
 * Wraps a promise with a timeout.
 * @param promise The promise to execute.
 * @param ms Timeout in milliseconds.
 * @param name Identifier for logging.
 * @returns The resolved promise or throws a timeout error.
 */
export declare function withTimeout<T>(promise: Promise<T>, ms: number, name: string): Promise<T>;
/**
 * Retries an async function with exponential backoff.
 * @param fn The async function to retry.
 * @param maxRetries Maximum number of retries.
 * @param baseDelayMs Base delay for exponential backoff.
 * @param name Identifier for logging.
 * @returns The resolved result of the function.
 */
export declare function withRetry<T>(fn: () => Promise<T>, maxRetries?: number, baseDelayMs?: number, name?: string): Promise<T>;
//# sourceMappingURL=utils.d.ts.map