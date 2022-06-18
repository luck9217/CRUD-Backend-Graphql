"use strict";
//import { GraphQLString } from "graphql"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_USER = exports.GET_USER = exports.GET_ALL_USERS = void 0;
const graphql_1 = require("graphql");
const Users_1 = require("../../Entities/Users");
const User_1 = require("../TypeDefs/User");
exports.GET_ALL_USERS = {
    type: new graphql_1.GraphQLList(User_1.UserType),
    //type: UserType, // if i need only 1 row
    //type: GraphQLString,
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Users_1.Users.find();
            return result;
            //return result[0]; //return only one row
            //return "Users List" //test return with string, type:GraphQLString
        });
    },
};
exports.GET_USER = {
    type: User_1.UserType,
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Users_1.Users.findOneBy({ id: args.id });
            return result;
        });
    },
};
exports.UPDATE_USER = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        oldPassword: { type: graphql_1.GraphQLString },
        newPassword: { type: graphql_1.GraphQLString },
    },
    resolve(_, { id, name, username, oldPassword, newPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("adasd");
            const userFound = yield Users_1.Users.findOne(id);
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
        });
    },
};
