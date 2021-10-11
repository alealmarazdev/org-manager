import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import User from '../User';
import Account from '../Account';

@Entity()
export default class Team {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  name!: string;

  /*   @Column((type) => Account)
  account!: Account;

  @Column((type) => User)
  user!: User[]; */

  constructor(params: { name: string }) {
    Object.assign(this, params);
  }
}
