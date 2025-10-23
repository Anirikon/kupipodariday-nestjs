import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dtoUser/update-user.dto';
import { CreateUserDto } from './dtoUser/create-user.dto';
import { Wish } from 'src/wishes/wish.model';
import { FindUserDto } from './dtoUser/find-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) {}

        async findOne(id: number): Promise<User> {
            const user = await this.userRepository.findOne({ where: { id } })
            if (!user) {
                throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
            }
            return user;
        }

        async create(user: CreateUserDto): Promise<CreateUserDto> {
            return this.userRepository.save(user);
        }

        async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
            const user = await this.userRepository.findOne({ where: { id } })

            if (!user) {
                throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
            }

            const updatedUser = this.userRepository.merge(user, updateUserDto)

            return await this.userRepository.save(updatedUser);
        }

        async delete(id: number): Promise<Object> {
            
            return await this.userRepository.delete(id);
        }

        async findOneByUsername(username: string): Promise<User> {
            const user = await this.userRepository.findOne({ where: { username } })
            if (!user) {
                throw new NotFoundException(`Пользователь с именем: ${username} не найден`);
            }
            return user;
        }

        async findOneByEmail(email: string): Promise<User> {
            const user = await this.userRepository.findOne({ where: { email } })
            if (!user) {
                throw new NotFoundException(`Пользователь с email: ${email} не найден`);
            }
            return user;
        }

        async findOneById(id: number): Promise<User> {
            const user = await this.userRepository.findOne({ where: { id } })
            if (!user) {
                throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
            }
            return user
        }

        async getMyWishes(id: number): Promise<Wish[]> {
            const user = await this.userRepository.findOne({ where: { id } })
            if (!user) {
                throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
            }
            return user.wishes
        }

        async findManyUsers(findUserDto: FindUserDto): Promise<User> {
            const { query } = findUserDto
            const users = await this.userRepository.findOne({ where: [{ username: Like(`%${query}`)}, { email: Like(`%${query}`)}]})
            if (!users) {
                throw new NotFoundException(`Пользователи не найдены`);
            }
            return users
        }

        async findUserWishes(findUserDto: FindUserDto): Promise<Wish[]> {
            const { query } = findUserDto
            const users = await this.userRepository.findOne({ where: [{ username: Like(`%${query}`)}, { email: Like(`%${query}`)}]})
            if (!users) {
                throw new NotFoundException(`Пользователи не найдены`);
            }
            return users.wishes
        }
}
