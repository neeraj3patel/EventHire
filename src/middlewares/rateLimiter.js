import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: { success: false, message: 'Too many requests, please try again later' },
});

export const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: { success: false, message: 'Too many submissions, please try again later' },
});
