import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Users { 
   @PrimaryGeneratedColumn("uuid")
   id!: string

   @Column({
      nullable: false
   })
   name!: string

   @Column(
      {
         nullable: false
      }
   )
   first_name!: string

   @Column(
      {
         nullable: false
      }
   )
   birthdate!: Date

   @Column({
      nullable: false,
      unique: true
   }
   )
   email!: string

   @Column(
      "varchar" ,
      {
         length: 255, 
         nullable: false
      }
   )
   password!: string

   @CreateDateColumn()
   created_at!: Date

   @Column(
      {
         nullable: false,
         default: false}
   )
   is_admin!: boolean
}
