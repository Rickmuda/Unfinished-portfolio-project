import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the payload stored in the JWT token
interface UserPayload {
  userId: number;
  isAdmin: number;
}

// Middleware function to authenticate the token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the token from the cookies
  const token = req.cookies['auth_token'];

  // If no token is found, respond with 401 (Unauthorized)
  if (!token) return res.sendStatus(401);

  // Verify the token using the JWT secret key
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    // If token verification fails, respond with 403 (Forbidden)
    if (err) return res.sendStatus(403);

    // Attach the user information from the token to the request object
    req.user = user as UserPayload;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
