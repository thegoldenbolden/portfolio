import type { NextAuthOptions, TokenSet } from "next-auth";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

const SPOTIFY_AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?scope=user-read-private`;

export const authOptions: NextAuthOptions = {
 debug: process.env.NODE_ENV === "development",
 secret: process.env.NEXTAUTH_SECRET,
 providers: [
  SpotifyProvider({
   clientId: process.env.SPOTIFY_CLIENT_ID,
   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
   authorization: SPOTIFY_AUTHORIZATION_URL,
  }),
 ],
 pages: {
  error: "/error",
  signIn: "/login",
  signOut: "/logout",
 },
 callbacks: {
  async jwt({ token, account }) {
   if (account) {
    return {
     ...token,
     access_token: account.access_token,
     expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
     refresh_token: account.refresh_token,
    };
   } else if (token.expires_at && Date.now() < token.expires_at * 1000) {
    return token;
   } else {
    try {
     const url = new URL("https://accounts.spotify.com/api/token");
     url.searchParams.set("client_id", process.env.SPOTIFY_CLIENT_ID);
     url.searchParams.set("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
     url.searchParams.set("grant_type", "refresh_token");
     url.searchParams.set("refresh_token", `${token.refresh_token}`);

     const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
     });

     const tokens: TokenSet & { expires_in: number } = await response.json();
     if (!response.ok) throw tokens;

     return {
      ...token,
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refresh_token: tokens.refresh_token ?? token.refresh_token,
     };
    } catch (error) {
     console.error("Error refreshing access token", error);
     return {
      ...token,
      error: "RefreshAccessTokenError" as const,
     };
    }
   }
  },
  async session({ session, token }) {
   session.error = token.error;

   return {
    ...session,
    access_token: token.access_token,
    user: {
     name: token.name,
     image: token.picture,
    },
   };
  },
 },
};

export default NextAuth(authOptions);
