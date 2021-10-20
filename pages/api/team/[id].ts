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

  const teamRepository = getMongoRepository(Team);
  let team = await teamRepository.findOne(id as string);

  switch (method) {
    case 'GET':
      // Get data from your database
      if (!team) {
        return res.status(404).json({ data: 'no found' });
      }

      return res.status(200).json({ data: team });
    case 'PUT':
      // Update data in your database
      if (!team) {
        return res.status(404).json({ data: 'Not found' });
      }
     /*  const content = JSON.parse(body) */
      const updatedTeam = Object.assign({}, team, body)

      await teamRepository.update(id, updatedTeam);
      return res.status(200).json({ data: updatedTeam });

    case 'DELETE':
      // Delete data in your database
      await teamRepository.delete(id);
      res.status(200).json({ data: id });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
