import { serialize } from 'cookie';
import jwt from 'jwt-simple';

// Set a new admin token
export const setNewToken = (res) => {
  const expires = new Date();
  // Tokens last for 24 hours
  expires.setHours(expires.getHours() + 24);
  const tokenPayload = {
    expires: expires.getTime(),
  };
  const token = jwt.encode(tokenPayload, process.env.JWT_SIGN);
  return setCookie(res, { name: 'admin_token', value: token });
};

// Set cookie on a NextResponse or regular response
export const setCookie = (
  res,
  { name, value, options = { httpOnly: true, path: '/' } },
) => {
  // The NextResponse class has propertiy 'cookie' for setting cookies
  if (res.cookie) {
    res.cookie(name, value, options);
  } else {
    // Use default 'setHeader' if not NextResponse class
    res.setHeader('Set-Cookie', serialize(name, value, options));
  }
  return res;
};

export const validateAdminToken = (req) => {
  const token = req.cookies.admin_token;
  jwt.decode(token, process.env.JWT_SIGN);
  return 'success';
}
