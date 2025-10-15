import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.model';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dtoWishlist/create-wishlist.dto';
import { UpdateWishlistDto } from './dtoWishlist/update-wishlist.dto';

@Injectable()
export class WishlistsService {
    constructor(@InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>) {}
        async findAll(): Promise<Wishlist[]> {
            return this.wishlistRepository.find();
        }

        async findOne(id: number): Promise<Wishlist | null> {
            const wishlist = this.wishlistRepository.findOne({ where: { id }})
            if(!wishlist) {
                throw new NotFoundException(`Список желаемых подарков с ID: ${id} не найден`) 
            }
            return wishlist;
        }

        async create(wishlist: CreateWishlistDto): Promise<CreateWishlistDto> {
                    return this.wishlistRepository.save(wishlist);
                }
        
                async update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
                    const wishlist = await this.wishlistRepository.findOne({ where: { id }})
                    if(!wishlist) {
                        throw new NotFoundException(`Подарок с ID: ${id} не найден`)
                    }
                    const updateWishlist = this.wishlistRepository.merge(wishlist, updateWishlistDto)
                    return await this.wishlistRepository.save(updateWishlist);
                }
        
                async delete(id: number): Promise<Object> {
                    return await this.wishlistRepository.delete(id);
                }
}
