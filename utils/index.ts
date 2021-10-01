/* import { getConnection, createConnection } from "typeorm";
import { Profile } from "../entity/Test/profile";
import { Photo } from "../entity/Test/photo";
import { User } from "../entity/Test/user";

export async function getOrCreateConnection() {
  try {
    const conn = getConnection();
    return conn;
  } catch (e) {
    return createConnection({
      type: "mongodb",
      host: process.env.POSTGRES_HOST as string,
      port: parseInt(process.env.POSTGRES_PORT as string),
      username: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      database: process.env.POSTGRES_DB as string,
      entities: [User, Photo, Profile],
      synchronize: true,
      logging: false
    });
  }
} */