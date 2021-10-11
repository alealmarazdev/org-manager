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
      res.status(200).json({ data: id });
      break;
    case 'PUT':
      // Update or create data in your database
      if (account) {
        for (const key of Object.keys(body as Partial<Account>)) {
          //@ts-ignore
          account[key] = body[key];
        }
        await accountRepository.update(id, account!);
        return res.status(200).json({ data: account });
      }
      res.status(404).json({ data: 'no found' });
      break;
    case 'DELETE':
      // Delete data in your database
      await accountRepository.delete(id);
      res.status(200).json({ data: id });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
