import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    // Guest login — no credentials needed
    CredentialsProvider({
      id: 'guest',
      name: 'Guest',
      credentials: {},
      async authorize() {
        return {
          id: 'guest-' + Math.random().toString(36).substring(2, 9),
          name: 'Guest User',
          email: 'guest@nemmfx.com',
          image: null,
        };
      },
    }),

    // Google — only loads if credentials are set
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Microsoft — only loads if credentials are set
    ...(process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET
      ? [
          {
            id: 'microsoft',
            name: 'Microsoft',
            type: 'oauth' as const,
            wellKnown:
              'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
            authorization: { params: { scope: 'openid email profile' } },
            clientId: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
            idToken: true,
            profile(profile: Record<string, string>) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: null,
              };
            },
          },
        ]
      : []),

    // Apple — only loads if credentials are set
    ...(process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET
      ? [
          {
            id: 'apple',
            name: 'Apple',
            type: 'oauth' as const,
            wellKnown:
              'https://appleid.apple.com/.well-known/openid-configuration',
            authorization: { params: { scope: 'openid email name' } },
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: process.env.APPLE_CLIENT_SECRET,
            idToken: true,
            profile(profile: Record<string, string>) {
              return {
                id: profile.sub,
                name: profile.name || profile.email,
                email: profile.email,
                image: null,
              };
            },
          },
        ]
      : []),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
    async signIn({ user }) {
      // Only sync to Supabase if credentials are available
      if (
        user.email &&
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.SUPABASE_SERVICE_ROLE_KEY
      ) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(user.email)}`,
            {
              headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              },
            }
          );
          const existing = await res.json();
          if (!existing || existing.length === 0) {
            await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users`, {
              method: 'POST',
              headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name || '',
                image: user.image || '',
              }),
            });
          }
        } catch (err) {
          console.error('Failed to sync user to Supabase:', err);
        }
      }
      return true;
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET || 'nemmfx-dev-secret-change-in-production',
};

export default NextAuth(authOptions);
