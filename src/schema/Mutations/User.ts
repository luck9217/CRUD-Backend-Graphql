import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../TypeDefs/User";
import bcrypt from "bcryptjs";
import { MessageType } from "../TypeDefs/Messages";

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
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(_: any, { id, name, username, oldPassword, newPassword }: any) {
    const userFound = await Users.findOne({ where: { id } });

    if (!userFound) {
      console.log("Sorry, but your ID doesn't exist. Please try again");

      //Graphql return
      return {
        success: false,
        message: "Sorry, but your ID doesn't exist. Please try again",
      };
    }

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);

    if (!isMatch) {
      //False Password
      console.log("Invalid password. Please try again");

      //Graphql return False
      return {
        success: isMatch,
        message: "Invalid password. Please try again",
      };
    }
    //True Password

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const response = await Users.update(
      { id },
      { username, name, password: newPasswordHash }
    );

    //affected=0 it doesnt uploaded
    if (response.affected === 0) {
      //No affected change
      console.log("Ups! something worng");

      //Graphql return False
      return {
        success: false,
        message: "Ups! something worng",
      };
    }
    //affected=1 if database its uploaded
    console.log("Update User successfully");
    //console.log(response.affected);

    //Graphql return True
    return {
      success: true,
      message: "Update User successfully",
    };
  },
};
