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

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists.');
        }

        const {token} = await this.userTokenRepository.generate(user.id);

        await this.mailProvider.sendMail({
            to:{
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData:{
                template: 'Olá, {{name}}: {{token}}',
                variables: {
                    name: user.name,
                    token,
                }
            }
        })

    }
}

export default SendForgotPasswordEmailsService;
