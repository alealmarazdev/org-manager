import { getMongoManager, getMongoRepository } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';
import Team from '../../../entity/Team';

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
  const userRepository = getMongoRepository(Team);
  const data = await userRepository.find();

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ data });
      break;
    case 'POST':
      // Create data in your database
      const newTeam = new Team(body);
      userRepository.save(newTeam);
      res.status(200).json({ data: newTeam });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
