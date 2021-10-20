import { getMongoRepository } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';
import User from '../../../entity/User';

type Data = {
  data: User | User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await getOrCreateConnection();

  const {
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
     /*  const content = JSON.parse(body) */
      const newUser = new User(body);
      userRepository.save(newUser);
      res.status(201).json({ data: newUser });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
