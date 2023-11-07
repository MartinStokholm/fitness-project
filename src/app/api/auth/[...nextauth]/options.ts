import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "name@provider.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const loginResponse = await fetch(
          "https://afefitness2023.azurewebsites.net/api/Users/login",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await loginResponse.json();

        if (loginResponse.ok && data?.jwt) {
          let token: { Name: string; Role: string; UserId: string } = jwtDecode(
            data?.jwt,
          );

          return {
            id: token.UserId,
            name: token.Name,
            email: credentials?.email,
            role: token.Role,
          };
        }
        return Promise.reject(new Error(data?.errors));
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      // Pass in role and id to the user session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
