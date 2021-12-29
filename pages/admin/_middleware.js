import { NextResponse } from 'next/server';
import jwt from 'jwt-simple';

export function middleware(req) {
  try {
    const token = req.cookies.admin_token;
    const payload = jwt.decode(token, process.env.JWT_SIGN);
    // All dates work in unix time
    const now = new Date().getTime();
    if (payload.expires < now) {
      throw new Error('Token expired');
    }
    if (payload.expires < now + 1.8 ** 6) {
      // Token will expire in 30 min or less, update it
      return setNewToken(NextResponse.next());
    }
  } catch (error) {
    return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}
