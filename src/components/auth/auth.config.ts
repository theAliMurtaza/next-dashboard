export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }: { auth?: any }) {
      return !!auth?.user;
    },
  },
  providers: [],
};