import { z } from 'zod';

/** Form inputs are strings; these validate numeric strings. Conversion happens in payload.ts. */
export const requiredNumber = (
  name: string,
  { min = 0, max, int = false }: { min?: number; max?: number; int?: boolean } = {},
) =>
  z
    .string()
    .trim()
    .min(1, `${name} is required`)
    .refine((v) => v === '' || Number.isFinite(Number(v)), 'Enter a valid number')
    .refine((v) => v === '' || !int || Number.isInteger(Number(v)), 'Must be a whole number')
    .refine((v) => v === '' || Number(v) >= min, `Must be at least ${min}`)
    .refine((v) => v === '' || max === undefined || Number(v) <= max, `Must be at most ${max}`);

export const optionalNumber = z
  .string()
  .trim()
  .refine((v) => v === '' || (Number.isFinite(Number(v)) && Number(v) >= 0), 'Enter a valid, non-negative number');

export const notesField = z.string().max(1000, 'Keep notes under 1000 characters');
