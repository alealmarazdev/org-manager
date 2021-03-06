import { getMongoRepository } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';
import Account from '../../../entity/Account';

type Data = {
  data: Account | Account[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await getOrCreateConnection();

  const {
    query: { id, name },
    method,
    body,
  } = req;

  const accountRepository = getMongoRepository(Account);

  switch (method) {
    case 'GET':
      // Get data from your database
      const data = await accountRepository.find();
      res.status(200).json({ data });
      break;
    case 'POST':
      // Create data in your database
      const newAccount = new Account(body);
      accountRepository.save(newAccount);
      res.status(200).json({ data: newAccount });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
