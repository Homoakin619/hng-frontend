import { randomBytes, randomUUID } from "crypto";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const BASE_URL = process.env.NEXTAUTH_URL


const AuthHandler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          id: "credentials",
          type: "credentials",
    
          credentials: {
            email: {
              label: "Email",
              type: "email",
              placeholder: "Email",
            },
            username: {
              label: "Username",
              type: "username",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          authorize: async (credentials, req) => {
            const credentialsObject = {
              email: credentials?.email,
              password: credentials?.password,
            };
            console.log(BASE_URL);
            
            console.log('logging credentials');
            
            console.log(credentialsObject);
            
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
              method: "POST",
              body: JSON.stringify(credentialsObject),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const user = await res.json();
            console.log('route msg');
            
            console.log(user);
            
            if (res.ok && user) {
              return user;
            } else {
              return null;
            }
          },
        }),
      ],
      session: {
        strategy: "jwt",
    
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 10 * 24 * 60 * 60, // 10 days
    
        updateAge: 24 * 60 * 60, // 24 hours
    
        generateSessionToken: () => {
          return randomUUID?.() ?? randomBytes(32).toString("hex");
        },
      },
      callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
          if (user) {
            token.accessToken = user.token;
            token.email = user.email;
          }
          return token;
        },
        async session({
          session,
          token,
          user,
        }: {
          session: any;
          token: any;
          user: any;
        }) {
          
          
          session.user = {
            email: token.email,
            accessToken: token.accessToken,
          };
          return session;
        },
      },
      pages: {
        signIn: "/auth/login",
      },
})

export { AuthHandler as GET, AuthHandler as POST };
