const userResolver = {
  // Query
  login: async (
    _: any,
    { account, pwd }: { [x: string]: string },
    { dataSources }: any
  ) => {
    return await dataSources.users.login(account, pwd);
  },

  // Mutation
  register: async (
    _: any,
    { account, pwd }: { [x: string]: string },
    { dataSources }: any
  ) => {
    return await dataSources.users.register(account, pwd);
  },
  destroyAccount: async (
    _: any,
    { account, pwd }: { [x: string]: string },
    { dataSources }: any
  ) => {
    return await dataSources.users.destroyAccount(account, pwd);
  }
};

export default userResolver;
