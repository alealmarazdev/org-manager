import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import Team from '../Team';

@Entity()
export default class User {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  english_level!: string;

  @Column()
  resume!: string;

  @Column()
  skills!: string;

  /* @Column((type) => Team)
  team!: Team[];

 */
  constructor(params: {
    name: string;
    email: string;
    english_level: string;
    resume: string;
    skills: string;
  }) {
    Object.assign(this, params);
  }
}
