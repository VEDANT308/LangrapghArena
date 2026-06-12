// Reliability Utilities

/**
 * Wraps a promise with a timeout.
 * @param promise The promise to execute.
 * @param ms Timeout in milliseconds.
 * @param name Identifier for logging.
 * @returns The resolved promise or throws a timeout error.
 */
export async function withTimeout<T>(promise: Promise<T>, ms: number, name: string): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`[Timeout] ${name} timed out after ${ms}ms`));
    }, ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

// HTTP status codes that are never worth retrying
const NON_RETRYABLE_CODES = new Set([400, 401, 403, 404, 422]);

/**
 * Retries an async function with exponential backoff.
 * Fast-fails on non-retryable errors (auth failures, bad requests).
 * @param fn The async function to retry.
 * @param maxRetries Maximum number of retries.
 * @param baseDelayMs Base delay for exponential backoff.
 * @param name Identifier for logging.
 * @returns The resolved result of the function.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  baseDelayMs: number = 500,
  name: string = "Operation"
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;

      // Fast-fail on non-retryable errors (bad API key, invalid request, etc.)
      const statusCode = error?.status || error?.response?.status;
      if (statusCode && NON_RETRYABLE_CODES.has(statusCode)) {
        console.error(`[Retry] ${name} failed with non-retryable status ${statusCode}. Aborting.`);
        throw error;
      }

      if (attempt >= maxRetries) {
        console.error(`[Retry] ${name} exhausted all ${maxRetries} retries.`);
        throw error;
      }

      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      console.warn(`[Retry] ${name} attempt ${attempt}/${maxRetries} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(`[Retry] ${name} failed unexpectedly.`);
}
