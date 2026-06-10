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

/**
 * Retries an async function with exponential backoff.
 * @param fn The async function to retry.
 * @param maxRetries Maximum number of retries.
 * @param baseDelayMs Base delay for exponential backoff.
 * @param name Identifier for logging.
 * @returns The resolved result of the function.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000,
  name: string = "Operation"
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
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
