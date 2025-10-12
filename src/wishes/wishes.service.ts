import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './wish.model';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dtoWish/create-wish.dto';
import { UpdateWishDto } from './dtoWish/update-wish.dto';

@Injectable()
export class WishesService {
    constructor(@InjectRepository(Wish) private wishRepository: Repository<Wish>) { }
        async findAll(): Promise<Wish[]> {
            return this.wishRepository.find();
        }

        async findOne(id: number): Promise<Wish> {
            const wish = await this.wishRepository.findOne({ where: { id } })
            if(!wish) {
                throw new NotFoundException(`Подарок с ID: ${id} не найден`);
            }
            return wish;
        }

        async create(wish: CreateWishDto): Promise<CreateWishDto> {
            return this.wishRepository.save(wish);
        }

        async update(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
            const wish = await this.wishRepository.findOne({ where: { id }})
            if(!wish) {
                throw new NotFoundException(`Подарок с ID: ${id} не найден`)
            }
            const updateWish = this.wishRepository.merge(wish, updateWishDto)
            return await this.wishRepository.save(updateWish);
        }

        async delete(id: number): Promise<Object> {
            return await this.wishRepository.delete(id);
        }
}
