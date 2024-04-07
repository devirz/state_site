import { createHash } from "crypto";

/**
 * Hashes a string using md5
 *
 * @param {string} str
 * @returns {string}
 */
export const md5 = (str: string): string => createHash('md5').update(str).digest('hex')