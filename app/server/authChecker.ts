import { AuthChecker } from "type-graphql";
import { Context } from "koa";

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  console.log(context);
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  // console.log(context.req.headers.authorization);
  return true; // or false if access is denied
};
