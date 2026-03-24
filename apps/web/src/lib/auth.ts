import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@my-dev-portfolio/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const DEV_LOGIN_EMAIL = process.env.DEV_LOGIN_EMAIL ?? "demo@portfolio.dev";
const DEV_LOGIN_PASSWORD = process.env.DEV_LOGIN_PASSWORD ?? "demo12345";
const DEV_LOGIN_NAME = process.env.DEV_LOGIN_NAME ?? "Demo User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // OAuth providers - configure in your .env file
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // Email/Password authentication
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();

        if (!email || !password) {
          return null;
        }

        if (email !== DEV_LOGIN_EMAIL || password !== DEV_LOGIN_PASSWORD) {
          return null;
        }

        return {
          id: "demo-user",
          email: DEV_LOGIN_EMAIL,
          name: DEV_LOGIN_NAME,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = user?.id ?? token?.sub ?? "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  trustHost: true,
});
