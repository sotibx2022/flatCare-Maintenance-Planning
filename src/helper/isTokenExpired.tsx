import { verify, JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
/**
 * Checks if a JWT token is expired or invalid.
 * Optionally clears the token cookie if expired.
 * @param token JWT token string
 * @param response Optional NextResponse object to clear cookie if token expired
 * @returns true if token is expired/invalid, false if valid
 */
export const isTokenExpired = async (
  token: string | null,
  response?: NextResponse
): Promise<boolean> => {
  if (!token) return true; // No token → expired/invalid
  try {
    const decodedToken = verify(token, process.env.SECRET_KEY!) as JwtPayload;
    if (decodedToken?.exp) {
      const expired = decodedToken.exp < Date.now() / 1000;
      // Clear cookie if expired and response is provided
      if (expired && response) {
        response.cookies.set('token', '', {
          httpOnly: true,
          path: '/',
          expires: new Date(0),
        });
      }
      return expired;
    }
    // Token has no expiration → treat as expired/invalid
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return true; // verification failed → expired/invalid
  }
};
