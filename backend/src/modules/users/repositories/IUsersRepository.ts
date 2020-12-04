import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUserRepository {
    findById(id: string): Promise <User | undefined>;
    findByEmail(email: string): Promise <User | undefined>;
    create(userData: ICreateUserDTO): Promise <User>;
    save(user:User): Promise<User>;
}