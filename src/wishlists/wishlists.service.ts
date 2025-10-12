import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.model';

@Injectable()
export class WishlistsService {
    constructor(@InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>) {}
        async findAll(): Promise<Wishlist[]> {
            return this.wishlistRepository.find();
        }

        // async findOne(id: number): Promise
}
