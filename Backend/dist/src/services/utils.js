// Reliability Utilities
/**
 * Wraps a promise with a timeout.
 * @param promise The promise to execute.
 * @param ms Timeout in milliseconds.
 * @param name Identifier for logging.
 * @returns The resolved promise or throws a timeout error.
 */
export async function withTimeout(promise, ms, name) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(`[Timeout] ${name} timed out after ${ms}ms`));
        }, ms);
    });
    try {
        return await Promise.race([promise, timeoutPromise]);
    }
    finally {
        clearTimeout(timeoutId);
    }
}
/**
 * Retries an async function with exponential backoff.
 * @param fn The async function to retry.
 * @param maxRetries Maximum number of retries.
 * @param baseDelayMs Base delay for exponential backoff.
 * @param name Identifier for logging.
 * @returns The resolved result of the function.
 */
export async function withRetry(fn, maxRetries = 3, baseDelayMs = 1000, name = "Operation") {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await fn();
        }
        catch (error) {
            attempt++;
            console.warn(`[Retry] ${name} failed on attempt ${attempt}/${maxRetries}. Error: ${error.message}`);
            if (attempt >= maxRetries) {
                console.error(`[Retry] ${name} exhausted all ${maxRetries} retries.`);
                throw error;
            }
            const delay = baseDelayMs * Math.pow(2, attempt - 1);
            console.log(`[Retry] ${name} waiting ${delay}ms before next attempt...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    throw new Error(`[Retry] ${name} failed unexpectedly.`);
}
//# sourceMappingURL=utils.js.map