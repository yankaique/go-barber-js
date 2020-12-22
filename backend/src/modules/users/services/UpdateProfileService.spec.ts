import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakehashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile',()=>{
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakehashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakehashProvider
        )
    })

    it('should be able to update the profile',async ()=>{
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:'123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com'
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should not be able to change to another user email',async ()=>{
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:'123456'
        })

        const user = await fakeUsersRepository.create({
            name: 'Joseph Doe',
            email: 'josephdoe@example.com',
            password:'123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should be able to update the password',async ()=>{
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:'123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password: '123456',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password',async ()=>{
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:'123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password',async ()=>{
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:'123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password:'wrong-old-password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);
    });
});
