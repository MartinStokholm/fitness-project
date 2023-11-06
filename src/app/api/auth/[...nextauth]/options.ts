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
            name: token.Name,
            role: token.Role,
            id: token.UserId,
            email: credentials?.email,
          };
        }
        return Promise.reject(new Error(data?.errors));
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
