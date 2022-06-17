import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;
}

//Change this on tsconfig.json
// "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
// "emitDecoratorMetadata": true,  
//    "strictPropertyInitialization": false,             /* Check for class properties that are declared but not set in the constructor. */
