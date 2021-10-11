import { getMongoRepository } from 'typeorm';
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
    query: { id },
    method,
    body,
  } = req;

  const userRepository = getMongoRepository(User);
  let user = await userRepository.findOne(id as string);

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ data: id });
      break;
    case 'PUT':
      // Update  data in your database
      if (user) {
        for (const key of Object.keys(body as Partial<User>)) {
          //@ts-ignore
          user[key] = body[key];
        }
        await userRepository.update(id, user!);
        return res.status(200).json({ data: user });
      }
      res.status(404).json({ data: 'no found' });
      break;
    case 'DELETE':
      // Delete data in your database
      await userRepository.delete(id);
      res.status(200).json({ data: id });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
