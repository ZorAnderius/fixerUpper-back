import crypto from "crypto";

/**
 * Generates a CSRF token (for Double Submit Cookie).
 *
 * @returns {string} A random hex token.
 */
const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export default generateCsrfToken;