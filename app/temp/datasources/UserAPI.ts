import { DataSource } from "apollo-datasource";
import User from "../../model/User";

class UserAPI<T> extends DataSource {
  store: User;
  context: any;
  constructor(database: User) {
    super();
    this.store = database;
  }

  initialize(config: any) {
    this.context = config.context;
  }

  reducer({ uid, auth, account, pwd }: any) {
    return {
      uid,
      auth,
      account,
      pwd
    };
  }

  // TODO: deal with error_pwd?
  // use token to?
  async login(account: string, pwd: string) {
    // @ts-ignore
    const res = await this.store.findOne({
      where: { account, pwd }
    });
    if (!res) {
      return {
        status: 0,
        token: null
      };
    }
    return {
      status: 1,
      token: "token"
    };
  }

  async register(account: string, pwd: string) {
    // @ts-ignore
    const res = await this.store.create({
      account,
      pwd
    });
    // return res;
    // generate token here?
    console.log(res);
    return {
      status: 0,
      token: "token",
      usersCount: 111
    };
  }


  async destroyAccount(account: string, pwd: string) {
    // @ts-ignore
    const res = await this.store.destory({
      account,
      pwd
    });
    // return res;
    // generate token here?
    console.log(res);
    return {
      status: 0,
      token: null,
      usersCount: 111
    };
  }
}

export default UserAPI;
