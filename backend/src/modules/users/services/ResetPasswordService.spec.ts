import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '@modules/users/providers/hashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUsersTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService',()=>{
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUsersTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider
        );
    })

    it('should be able to reset password',async ()=>{
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const {token} = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '123123',
            token
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () =>{
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () =>{
        const { token } = await fakeUserTokenRepository.generate('non-existiing-user');

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to reset password', async ()=>{
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const {token} = await fakeUserTokenRepository.generate(user.id);

       jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
           const customDate = new Date();

           return customDate.setHours(customDate.getHours() + 3);
       });

        await expect(
           resetPassword.execute({
            password: '123123',
            token
           })
       ).rejects.toBeInstanceOf(AppError)

    });

});
