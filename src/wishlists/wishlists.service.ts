import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wishlist } from "./wishlist.model";
import { In, Repository } from "typeorm";
import { CreateWishlistDto } from "./dtoWishlist/create-wishlist.dto";
import { UpdateWishlistDto } from "./dtoWishlist/update-wishlist.dto";
import { Wish } from "src/wishes/wish.model";
import { User } from "src/users/user.model";

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish) 
    private wishRepository: Repository<Wish>,
  ) {}
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async findOne(id: number): Promise<Wishlist | null> {
    const wishlist = this.wishlistRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException(`Список желаемых подарков не найден`);
    }
    return wishlist;
  }

  async create(user: User, dto: CreateWishlistDto): Promise<CreateWishlistDto> {
    const items = await this.wishRepository.find({
      where: { id: In(dto.itemsId) },
    });

    const wishlist = new Wishlist();
    wishlist.owner = user;
    wishlist.name = dto.name;
    wishlist.image = dto.image;
    wishlist.items = items;

    await this.wishlistRepository.save(wishlist);
    return wishlist;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    user: User,
  ): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException(`Список желаемых подарков не найден`);
    }

    if (wishlist.owner.id !== user.id) {
      throw new HttpException(
        "Нельзя редактрировать чужой список",
        HttpStatus.FORBIDDEN,
      );
    }

    const updateWishlist = this.wishlistRepository.merge(
      wishlist,
      updateWishlistDto,
    );
    return await this.wishlistRepository.save(updateWishlist);
  }

  async delete(id: number, user: User): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new NotFoundException(`Список желаемых подарков не найден`);
    }

    if (wishlist.owner.id !== user.id) {
      throw new HttpException(
        "Чужой список удалить нельзя",
        HttpStatus.FORBIDDEN,
      );
    }
    await this.wishlistRepository.delete(id);
    return wishlist;
  }
}
