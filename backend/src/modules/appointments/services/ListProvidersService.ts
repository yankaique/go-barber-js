/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ){

    }

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.usersRepository.findAllProvider({
            except_user_id: user_id
        });

        return classToClass(users);
    }
}

export default ListProvidersService;
