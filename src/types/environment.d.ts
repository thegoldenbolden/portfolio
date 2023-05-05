declare namespace NodeJS {
  export interface ProcessEnv {
    SENDGRID_KEY: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_VERCEL_URL: string;
  }
}
