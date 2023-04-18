import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
 interface Session {
  error?: "RefreshAccessTokenError";
  access_token: string;
  user: { id?: string } & DefaultSession["user"];
 }

 interface Account {
  expires_in: number;
 }
}

declare module "next-auth/jwt" {
 interface JWT {
  access_token?: string;
  expires_at?: number;
  refresh_token?: string;
  error?: "RefreshAccessTokenError";
 }
}
