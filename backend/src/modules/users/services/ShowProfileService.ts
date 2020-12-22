/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ){

    }

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowProfileService;
