"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GREETING = void 0;
const graphql_1 = require("graphql");
exports.GREETING = {
    type: graphql_1.GraphQLString,
    resolve: () => 'Hello World'
};
