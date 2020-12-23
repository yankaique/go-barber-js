import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvider',()=>{
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        listProvidersService = new ListProvidersService(
            fakeUsersRepository
        )
    })

    it('should be able to list the providers',async ()=>{
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:'123456'
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johntre@example.com',
            password:'123456'
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password:'123456'
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id
        });

        expect(providers).toEqual([user1, user2]);
    });
});
