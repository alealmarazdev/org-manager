import { getConnection, createConnection } from 'typeorm';
import User from '../entity/User';
import Team from '../entity/Team';
import Account from '../entity/Account';

let connectionReady: Promise<void> | null = null;

export function getOrCreateConnection() {
  if (!connectionReady) {
    connectionReady = (async () => {
      try {
        const staledConnection = getConnection();
        await staledConnection.close()
      } catch (err) {}

      await createConnection({
        type: 'mongodb',
        url: process.env.MONGODB_URI,
        useNewUrlParser: true,
        entities: [User, Team, Account],
        logging: true
      })
    })()
  }

  return connectionReady;
}
