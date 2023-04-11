import type { JWT } from "next-auth/jwt/types";
import NextAuth, { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = "user-library-modify";
const SPOTIFY_AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?scope=${scopes}`;

async function refreshAccessToken(token: JWT) {
 try {
  const url = new URL("https://accounts.spotify.com/api/token");
  url.searchParams.set("client_id", process.env.SPOTIFY_CLIENT_ID);
  url.searchParams.set("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
  url.searchParams.set("grant_type", "refresh_token");
  url.searchParams.set("refresh_token", `${token.refreshToken}`);

  const response = await fetch(url, {
   method: "POST",
   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
   throw refreshedTokens;
  }

  return {
   ...token,
   accessToken: refreshedTokens.access_token,
   accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
   refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
  };
 } catch (error) {
  console.error(error);
  return {
   ...token,
   error: "RefreshAccessTokenError",
  };
 }
}

export const authOptions: NextAuthOptions = {
 debug: process.env.NODE_ENV === "development",
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
  async jwt({ token, account, user }) {
   if (account && user) {
    account.expires_at &&= account.expires_at * 1000;

    return {
     accessToken: account.access_token,
     accessTokenExpires: account.expires_at,
     refreshToken: account.refresh_token,
     name: user.name,
     picture: user.image,
    };
   }

   if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
    return token;
   }

   return refreshAccessToken(token);
  },
  async session({ session, token }) {
   return {
    ...session,
    accessToken: token.accessToken,
    user: {
     name: token.name,
     image: token.picture,
    },
   };
  },
 },
};

export default NextAuth(authOptions);
