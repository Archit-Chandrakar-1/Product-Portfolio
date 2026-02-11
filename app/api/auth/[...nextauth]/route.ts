import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,     // <--- Must say process.env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // <--- Must say process.env
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email === "archit1chandrakar@gmail.com") {
        return true;
      }
      return false;
    },
  },
  pages: {
    error: '/auth/error', 
  }
});

export { handler as GET, handler as POST };