import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Photo } from '../Test/photo';
import { Profile } from '../Test/profile';

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column((type) => Profile)
  profile!: Profile;

  @Column((type) => Photo)
  photos!: Photo[];
}
