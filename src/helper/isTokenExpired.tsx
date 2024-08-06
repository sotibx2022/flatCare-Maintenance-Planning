import { NextRequest, NextResponse } from 'next/server';
import { verify, JwtPayload } from 'jsonwebtoken'; // Import verify function and JwtPayload type
export const isTokenExpired = async (
  request: NextRequest,
  response: NextResponse,
): Promise<boolean> => {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie?.value;
  if (!token) {
    // Token not found, so it's considered invalid
    return true;
  }
  try {
    // Verify and decode the token
    const decodedToken = verify(token, process.env.SECRET_KEY!) as JwtPayload;
    if (decodedToken && decodedToken.exp) {
      const isExpired = decodedToken.exp < Date.now() / 1000;
      if (isExpired) {
        // If token is expired, clear the token from cookies
        response.cookies.set('token', '', {
          httpOnly: true,
          path: '/',
          expires: new Date(0), // Set expiration date in the past
        });
      }
      return isExpired; // Return true if token is expired
    }
    // If the token does not have an expiration, treat it as invalid
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return true; // Return true if there was an error during verification
  }
};
