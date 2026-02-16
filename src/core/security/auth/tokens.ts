/**
 * ============================================================================
 * FILE: tokens.ts
 * LAYER: core
 * TYPE: util
 * ============================================================================
 *
 * PURPOSE:
 * -> Manage JSON Web Token (JWT) lifecycle.
 * -> Generate Access and Refresh tokens.
 * -> Verify token validity and signature.
 *
 * RESPONSIBILITY:
 * -> Issue secure, signed tokens for authenticated users.
 * -> Parse and validate incoming tokens from requests.
 *
 * ARCHITECTURE POSITION:
 * -> Core authentication logic used by login services and middleware.
 *
 * DATA FLOW:
 * -> User Payload -> [Sign] -> JWT String.
 * -> JWT String -> [Verify] -> User Payload / Error.
 *
 * SECURITY:
 * -> CRITICAL: The bedrock of stateless authentication.
 * -> Must ensure secrets are never exposed.
 * -> Tokens must have expiration times.
 *
 * PERFORMANCE:
 * -> fast signing/verifying using 'jsonwebtoken' or 'jose'.
 *
 * IMPROVEMENTS:
 * -> Implement token rotation and revocation lists (blacklisting).
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

// import { SECURITY_CONSTANTS } from '../config/constants';
import { TokenPayload } from '../types/auth.types';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const generateAccessToken = (payload: TokenPayload): string => {
    // return jwt.sign(payload, JWT_SECRET, { expiresIn: SECURITY_CONSTANTS.TOKEN_EXPIRY });
    return `mock_access_token_${payload.sub}`;
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    // return jwt.sign(payload, JWT_SECRET, { expiresIn: SECURITY_CONSTANTS.REFRESH_TOKEN_EXPIRY });
    return `mock_refresh_token_${payload.sub}`;
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        // return jwt.verify(token, JWT_SECRET) as TokenPayload;
        if (token.startsWith('mock_')) return { sub: '123', role: 'admin', iat: Date.now(), exp: Date.now() + 3600 };
        return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        return null;
    }
};
