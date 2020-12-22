import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailsService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokenRepository: IUsersTokensRepository
    ){

    }

    public async execute({email}: IRequest): Promise<void> {

        const checkUserExist = await this.usersRepository.findByEmail(email);

        if(!checkUserExist){
            throw new AppError('User does not exists.');
        }

        const {token} = await this.userTokenRepository.generate(checkUserExist.id);

        await this.mailProvider.sendMail(
            email, `Pedido de recuperação de senha recebido: ${token}`
        )

    }
}

export default SendForgotPasswordEmailsService;
