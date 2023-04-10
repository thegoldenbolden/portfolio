import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
 interface Session {
  user: { id?: string } & DefaultSession["user"];
  accessToken?: string;
 }
}

declare module "next-auth/jwt" {
 interface JWT {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
 }
}
