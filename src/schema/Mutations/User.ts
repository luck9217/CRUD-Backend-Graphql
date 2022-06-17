import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../../typeDefs/User";
import bcrypt from "bcryptjs";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    //destructuring args
    const { name, username, password } = args;

    const encryptPassword = await bcrypt.hash(password, 10);

    const result = await Users.insert({
      name: name,
      username: username,
      password: encryptPassword,
    });

    console.log(result);
    return {
      ...args,
      id: result.identifiers[0].id,
      password: encryptPassword,
    };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const result = await Users.delete(id);
    if (result.affected === 1) return true;
    return false;
  },
};
