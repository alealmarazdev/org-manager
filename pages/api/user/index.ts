import { getMongoManager, getMongoRepository } from 'typeorm';
import User from '../../../entity/User';
import Team from '../../../entity/Team';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const conn = await getOrCreateConnection();
  const {
    query: { id, name },
    method,
    body,
  } = req;

  const userRepository = getMongoRepository(User);

  switch (method) {
    case 'GET':
      // Get data from your database
      const data = await userRepository.find();
      res.status(200).json({ data });
      break;
    case 'POST':
      // Create data in your database
      const newUser = new User(body);
      userRepository.save(newUser);
      res.status(201).json({ data: newUser });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
