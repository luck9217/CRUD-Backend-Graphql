//import { GraphQLString } from "graphql"
import { UserType } from "../../typeDefs/User";

import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { Users } from "../../Entities/Users";

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
