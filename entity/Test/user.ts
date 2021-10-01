import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";
import { Photo } from "./photo";
import { Profile } from "./profile";

@Entity()
export class User {
    
    @ObjectIdColumn()
    id!: ObjectID;
    
    @Column()
    firstName!: string;
    
    @Column()
    lastName!: string;
    
    @Column(type => Profile)
    profile!: Profile;
    
    @Column(type => Photo)
    photos!: Photo[];
    
}