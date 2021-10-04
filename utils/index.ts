import { getConnection, createConnection } from 'typeorm';
import { Profile } from '../entity/Test/profile';
import { Photo } from '../entity/Test/photo';
import { User } from '../entity/Test/user';

export async function getOrCreateConnection() {
  try {
    const conn = getConnection();
    return conn;
  } catch (e) {
    console.log(' ==== en index util');
    return createConnection({
      type: 'mongodb',
      url: process.env.MONGODB_URI as string,
      useNewUrlParser: true,
      entities: [User, Photo, Profile],
      synchronize: true,
      logging: true,
    });
  }
}
