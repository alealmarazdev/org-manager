import { getMongoRepository } from 'typeorm';
import User from '../../../entity/User';
import Account from '../../../entity/Account';
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

  const accountRepository = getMongoRepository(Account);
  let account = await accountRepository.findOne(id as string);

  switch (method) {
    case 'GET':
      // Get data from your database
      if (!account) {
        return res.status(404).json({ data: 'no found' });
      }

      return res.status(200).json({ data: account });
      
    case 'PUT':
      // Update or create data in your database
      if (!account) {
        return res.status(404).json({ data: 'Not found' });
      }
      /* const content = JSON.parse(body) */
      const updatedAccount = Object.assign({}, account, body)

      await accountRepository.update(id, updatedAccount);
      return res.status(200).json({ data: updatedAccount });

    case 'DELETE':
      // Delete data in your database
      await accountRepository.delete(id);
      res.status(200).json({ data: id as string });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
