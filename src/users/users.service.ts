import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtoUser/update-user.dto';
import { CreateUserDto } from './dtoUser/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) {}
        async findAll(): Promise<User[]> {
            return this.userRepository.find();
        }

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
}
