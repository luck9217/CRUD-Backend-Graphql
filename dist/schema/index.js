"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.Mutation = void 0;
const graphql_1 = require("graphql");
const Greeting_1 = require("./Queries/Greeting");
const User_1 = require("./Mutations/User");
const User_2 = require("./Queries/User");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        greeting: Greeting_1.GREETING,
        getAllUsers: User_2.GET_ALL_USERS,
        getUser: User_2.GET_USER,
    },
});
exports.Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: User_1.CREATE_USER,
        deleteUser: User_1.DELETE_USER,
        updateUser: User_1.UPDATE_USER,
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: exports.Mutation,
});
