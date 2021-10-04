import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity() 
export class Student {  

   @ObjectIdColumn() 
   id!: ObjectID; 
   
   @Column() 
   Name!: string; 
   
   @Column() 
   Email!: string; 
}