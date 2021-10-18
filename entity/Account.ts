import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
/* import Team from '../Team'; */

@Entity()
export default class Account {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  name!: string;

  @Column()
  client!: string;

  @Column()
  responsable!: string;

  /*   @Column((type) => Team)
  team!: Team[]; */
  constructor(params: { name: string; client: string; responsable: string }) {
    Object.assign(this, params);
  }
}
