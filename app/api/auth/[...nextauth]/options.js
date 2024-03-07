import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail, createUser } from "../../../../db/queries/user";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "google-user";
        return {
          ...profile,
          role: userRole,
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      profile(profile) {
        let userRole = "github-user";
        return {
          ...profile,
          role: userRole,
          id: profile.id,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let image;
        if (user.role === "google-user") {
          image = user.picture;
        } else if (user.role === "github-user") {
          image = user.avatar_url;
        } else {
          image = "https://robohash.org" + user_id;
        }
        let name = user.name;
        let email = user.email;
        let dbUser = await getUserByEmail(email);
        if (!dbUser) {
          console.log("creating user...");
          await createUser(name, email, image);
        }
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
