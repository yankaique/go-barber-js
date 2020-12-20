import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokenRepository';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailsService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUsersTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail',()=>{
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUsersTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository
        );
    })

    it('should be able to recover the password using the email',async ()=>{
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com'
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password',async()=>{
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await expect(sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should a generate a forgot password token',async()=>{
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com'
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
