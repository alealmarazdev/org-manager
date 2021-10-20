import { getMongoRepository } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';
import User from '../../../entity/User';

type Data = {
  data: User | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await getOrCreateConnection();

  const {
    query: { id },
    method,
    body,
  } = req;

  const userRepository = getMongoRepository(User);
  let user = await userRepository.findOne(id as string);

  switch (method) {
    case 'GET':
      // Get data from your database
      if (!user) {
        return res.status(404).json({ data: 'no found' });
      }

      return res.status(200).json({ data: user });

    case 'PUT':
      // Update  data in your database
      if (!user) {
        return res.status(404).json({ data: 'Not found' });
      }

      const updatedUser = Object.assign({}, user, body)

      await userRepository.update(id, updatedUser);
      return res.status(200).json({ data: updatedUser });

    case 'DELETE':
      // Delete data in your database
      await userRepository.delete(id);
      return res.status(200).json({ data: id as string });

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
