"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_USER = exports.DELETE_USER = exports.CREATE_USER = void 0;
const graphql_1 = require("graphql");
const Users_1 = require("../../Entities/Users");
const User_1 = require("../TypeDefs/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Messages_1 = require("../TypeDefs/Messages");
exports.CREATE_USER = {
    type: User_1.UserType,
    args: {
        name: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            //destructuring args
            const { name, username, password } = args;
            const encryptPassword = yield bcryptjs_1.default.hash(password, 10);
            const result = yield Users_1.Users.insert({
                name: name,
                username: username,
                password: encryptPassword,
            });
            console.log(result);
            return Object.assign(Object.assign({}, args), { id: result.identifiers[0].id, password: encryptPassword });
        });
    },
};
exports.DELETE_USER = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Users_1.Users.delete(id);
            //Show solve on the Graphql WebSite
            if (result.affected === 1)
                return true;
            return false;
        });
    },
};
exports.UPDATE_USER = {
    type: Messages_1.MessageType,
    args: {
        id: { type: graphql_1.GraphQLID },
        input: {
            type: new graphql_1.GraphQLInputObjectType({
                name: "UserInput",
                fields: {
                    name: { type: graphql_1.GraphQLString },
                    username: { type: graphql_1.GraphQLString },
                    oldPassword: { type: graphql_1.GraphQLString },
                    newPassword: { type: graphql_1.GraphQLString },
                },
            }),
        },
    },
    resolve(_, { id, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield Users_1.Users.findOne({ where: { id } });
            if (!userFound) {
                console.log("Sorry, but your ID doesn't exist. Please try again");
                //Graphql return
                return {
                    success: false,
                    message: "Sorry, but your ID doesn't exist. Please try again",
                };
            }
            const isMatch = yield bcryptjs_1.default.compare(input.oldPassword, userFound.password);
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
            const newPasswordHash = yield bcryptjs_1.default.hash(input.newPassword, 10);
            const response = yield Users_1.Users.update({ id }, { username: input.username, name: input.name, password: newPasswordHash });
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
        });
    },
};
