"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Entities/Users");
const config_1 = require("./config");
//typeorm config
exports.connectDB = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.DB_HOST,
    port: Number(config_1.DB_PORT),
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    entities: [Users_1.Users],
    synchronize: true,
    logging: true,
    ssl: false //connection secure
    //fix connection with mysql
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
    // flush privileges;
});
////////////////////////////////////////////////////////////////////
// import {DataSource} from 'typeorm';
//typeorm config
// export const connectDB = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "admin",
//     database: "typeormdb",
//     entities: [],
//     synchronize: true, //review changes and upload
//     logging: true,// information log
// })
