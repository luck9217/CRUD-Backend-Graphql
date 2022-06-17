import {DataSource} from 'typeorm';
import { Users } from "./Entities/Users";

//typeorm config
export const connectDB = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "usersdb",
    entities: [Users],
    synchronize: true, //review changes and upload
    logging: true,// information log
    ssl:false //connection secure

    //fix connection with mysql
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
    // flush privileges;
})

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