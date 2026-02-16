/**
 * ============================================================================
 * FILE: crypto.ts
 * LAYER: core
 * TYPE: util
 * ============================================================================
 *
 * PURPOSE:
 * -> Symmetric encryption/decryption utilities using Node.js crypto.
 * -> Securely store sensitive data (PII, tokens) in the database.
 *
 * RESPONSIBILITY:
 * -> Encrypt data with a secret key.
 * -> Decrypt data back to plaintext.
 *
 * ARCHITECTURE POSITION:
 * -> Used by data access layers when reading/writing sensitive fields.
 *
 * DATA FLOW:
 * -> Plaintext -> [AES-256-CBC] -> Ciphertext.
 *
 * SECURITY:
 * -> CRITICAL: Relies on the secrecy of the encryption key.
 * -> Uses IVs to ensure same plaintext yields different ciphertext.
 *
 * PERFORMANCE:
 * -> Fast symmetric encryption.
 *
 * IMPROVEMENTS:
 * -> Implement key rotation strategy.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */


import crypto from 'crypto';

const ALGORITHM = 'aes-256-cmc'; // Standard secure algorithm
// In production, these should come from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;

export const encrypt = (text: string): string => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);

    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string): string => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};
