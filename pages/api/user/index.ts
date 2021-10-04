import { getMongoManager } from 'typeorm';
import { Photo } from '../../../entity/Test/photo';
import { Profile } from '../../../entity/Test/profile';
import { User } from '../../../entity/Test/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateConnection } from '../../../utils';

type Data = {
  user: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const conn = await getOrCreateConnection();
  const user = new User();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.profile = new Profile();
  user.profile.about = 'About Trees and Me';
  user.profile.education = 'Tree School';
  user.profile.career = 'Lumberjack';
  user.photos = [
    new Photo('me-and-trees.jpg', 'Me and Trees', 100),
    new Photo('me-and-chakram.jpg', 'Me and Chakram', 200),
  ];

  const manager = getMongoManager();

  await manager.save(user);
  res.status(200).json({ user });
}
