import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import Team from './Team';

@Entity()
export default class Account {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  name!: string;

  @Column()
  client!: string;

  @Column()
  responsable!: string;

  @Column((type) => Team)
  teams!: Team[];

  constructor(params: { name: string; client: string; responsable: string; }) {
    Object.assign(this, params);
  }
}
