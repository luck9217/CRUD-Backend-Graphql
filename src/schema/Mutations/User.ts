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
      console.log("Sorry, but your ID doesn't exist. Please try again");

      //Graphql return
      return false;
    }

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);

    if (!isMatch) {
      //False Password
      console.log("Invalid password. Please try again");


    //Graphql return False
      return isMatch;
    }
    //True Password

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    Users.update({ id }, { username, name, password: newPasswordHash });

    console.log("Changed databases Successful")

     //Graphql return True
    return isMatch;

  },
};
