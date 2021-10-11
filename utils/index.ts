import { getConnection, createConnection } from 'typeorm';
import User from '../entity/User';
import Team from '../entity/Team';
import Account from '../entity/Account';

export async function getOrCreateConnection() {
  try {
    const conn = getConnection();
    return conn;
  } catch (e) {
    return createConnection({
      type: 'mongodb',
      url: process.env.MONGODB_URI as string,
      useNewUrlParser: true,
      entities: [User, Team, Account],
      synchronize: true,
      logging: true,
    });
  }
}
