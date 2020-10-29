import { Entity, Column, PrimaryColumn, } from "typeorm";

@Entity('users')
export default class User{
    @PrimaryColumn()
    email: string;
  
    @Column()
    name: string;
  
    @Column()
    password: string;

    @Column()
    passwordResetToken: string;
}