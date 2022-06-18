import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../TypeDefs/User";
import bcrypt from "bcryptjs";
import { Any } from "typeorm";

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

    //Show solve on the Graphql WebSite
    if (result.affected === 1) return true;
    return false;
  },
};

export const UPDATE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(_: any, { id, name, username, oldPassword, newPassword }: any) {
    console.log(id, name, username, oldPassword, newPassword);

    const userFound = await Users.findOne({ where: { id } });

    if (!userFound) {
      console.log("User not found");
      return false;
    }

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);

    console.log("User with password its :",isMatch);

    return isMatch;
  },
};
