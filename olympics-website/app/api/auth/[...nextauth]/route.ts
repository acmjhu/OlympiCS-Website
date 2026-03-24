<<<<<<< HEAD
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions : NextAuthOptions = {
=======
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
>>>>>>> 8fc9790 (spoddar2 set up NextAuth.js authentication (#26))
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ]
<<<<<<< HEAD
};
const handler = NextAuth(authOptions);
=======
})

>>>>>>> 8fc9790 (spoddar2 set up NextAuth.js authentication (#26))
export { handler as GET, handler as POST }