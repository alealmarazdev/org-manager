import { getMongoManager, getMongoRepository } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';
import Team from '../../../entity/Team';
import Account from '../../../entity/Account';

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

  const teamRepository = getMongoRepository(Team);
  const accountRepository = getMongoRepository(Account)

  switch (method) {
    case 'GET':
      // Get data from your database
      const data = await teamRepository.find();
      res.status(200).json({ data });
      break;

    case 'POST':
      // Create data in your database
      const account = await accountRepository.findOne(body.accountId as string)
      if(!account) {
         res.status(400).json({ data: 'Not account id found' })
         return
      }

      const newTeam = new Team(body);
      await teamRepository.save(newTeam);

     const teamsIds = account.teams.map((team) => team._id)
      account.teams= [...account.teams, newTeam]
      await accountRepository.update(body.accountId, account)

      res.status(200).json({ data: newTeam });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
