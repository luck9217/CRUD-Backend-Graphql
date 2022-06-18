//import { GraphQLString } from "graphql"

import {
  BreakingChangeType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../TypeDefs/User";
import bcrypt from "bcryptjs";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  //type: UserType, // if i need only 1 row
  //type: GraphQLString,
  async resolve() {
    const result = await Users.find();

    return result;

    //return result[0]; //return only one row
    //return "Users List" //test return with string, type:GraphQLString
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, args: any) {
    const result = await Users.findOneBy({ id: args.id });
    return result;
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
    console.log("adasd");

    const userFound = await Users.findOne(id);
 

    if (!userFound) {
      console.log("asda");
      return true;
    }

    //console.log(userFound.password, oldPassword);

    // const isMatch=await bcrypt.compare(oldPassword,userFound.password);

    // if(!isMatch) return false;

    // const newPasswordHash=await bcrypt.hash(newPassword,10)

    // const response =await Users.update({id},{username,name,password:newPasswordHash})

    // if(response.affected===0) return false

    return true;
  },
};
