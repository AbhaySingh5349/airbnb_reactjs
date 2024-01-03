import { User } from '../models/user.model';
import { GetUserByIdParams } from '../types/types';
import { BadRequestError } from '../errors/index';

const getUserById = async (params: GetUserByIdParams) => {
  const { userId } = params;

  const user = await User.findById(userId);
  if (!user) throw new BadRequestError(`User not found with id: ${userId}`);

  return user;
};

export { getUserById };
