export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }: { auth?: { user?: unknown } }) {
      return !!auth?.user;
    },
  },
  providers: [],
};
