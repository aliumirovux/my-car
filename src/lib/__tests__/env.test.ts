import { parsePublicEnv } from '../env';

describe('parsePublicEnv', () => {
  it('returns null when variables are missing', () => {
    expect(parsePublicEnv({ supabaseUrl: undefined, supabaseAnonKey: undefined })).toBeNull();
    expect(parsePublicEnv({ supabaseUrl: '', supabaseAnonKey: '' })).toBeNull();
  });

  it('rejects an invalid URL', () => {
    expect(parsePublicEnv({ supabaseUrl: 'not a url', supabaseAnonKey: 'key' })).toBeNull();
  });

  it('accepts a valid configuration', () => {
    expect(
      parsePublicEnv({ supabaseUrl: 'https://abc.supabase.co', supabaseAnonKey: 'public-anon-key' }),
    ).toEqual({ supabaseUrl: 'https://abc.supabase.co', supabaseAnonKey: 'public-anon-key' });
  });
});
