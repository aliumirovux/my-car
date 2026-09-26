import { z } from 'zod';

// Only EXPO_PUBLIC_* variables are inlined into the bundle, and only when accessed
// as literal `process.env.EXPO_PUBLIC_X` expressions — do not destructure process.env.
const schema = z.object({
  supabaseUrl: z.url(),
  supabaseAnonKey: z.string().min(1),
});

export type PublicEnv = z.infer<typeof schema>;

export function parsePublicEnv(raw: Record<keyof PublicEnv, string | undefined>): PublicEnv | null {
  const result = schema.safeParse(raw);
  return result.success ? result.data : null;
}

/** `null` when Supabase is not configured (e.g. no `.env` yet) — callers must handle it. */
export const publicEnv = parsePublicEnv({
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});
