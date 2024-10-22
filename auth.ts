import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db/db";
import { getUserCompanies } from "./db/db.util";
import { verifyUserAction } from "./lib/actions/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image: string;
      companies: Company[];
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const [err, user] = await verifyUserAction(
          credentials?.email as string,
          credentials?.password as string
        );

        // console.log(err?.message, user, 100);

        if (err) {
          throw new Error(err?.message);
        }
        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(200, session, token, 200)
      if (token && token.sub) {
        session.user.id = token?.sub as string;
        session.user.image = token?.picture || "";
        const companies = await getUserCompanies(token?.sub);
        session.user.companies = companies || [];
      } else {
        session.user.companies = [];
      }

      return session;
    },
    // async jwt({ token, user }) {
    //   console.log(100, user, 100);
    //   const customUser: any = user;
    //   if (customUser) {
    //     token.id = customUser.id;
    //     token.accessToken = customUser.accessToken;
    //   }
    //   return token;
    // },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      // console.log(200,auth, 200)
      // Logged in users are authenticated, otherwise redirect to login page
      return auth && auth.user ? true : false;
    },
  },
  pages: {
    signIn: "/auth",
  },

  session: {
    strategy: "jwt",
  },
});
