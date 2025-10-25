import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Wish } from "./wish.model";
import { Repository } from "typeorm";
import { CreateWishDto } from "./dtoWish/create-wish.dto";
import { UpdateWishDto } from "./dtoWish/update-wish.dto";
import { User } from "src/users/user.model";
import { DataSource } from "typeorm/browser";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    @InjectDataSource() private dataSource: DataSource
  ) {}
  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({ where: { id } });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID: ${id} не найден`);
    }
    return wish;
  }

  async create(wish: CreateWishDto, user: User): Promise<CreateWishDto> {
    return this.wishRepository.save({ ...wish, owner: user });
  }

  async update(id: number, updateWishDto: UpdateWishDto, user): Promise<Wish> {
    const wish = await this.wishRepository.findOne({ where: { id } });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID: ${id} не найден`);
    }

    if (wish.owner.id !== user.id) {
      throw new HttpException(
        "Нельзя редактрировать чужой список",
        HttpStatus.FORBIDDEN
      );
    }

    const updateWish = this.wishRepository.merge(wish, updateWishDto);
    return await this.wishRepository.save(updateWish);
  }

  async delete(id: number, user: User): Promise<Object> {
    const wish = await this.findOne(id);
    if (!wish) {
      throw new NotFoundException(`Подарок с ID: ${id} не найден`);
    }

    if (wish.owner.id !== user.id) {
      throw new HttpException(
        "Нельзя редактрировать чужой список",
        HttpStatus.FORBIDDEN
      );
    }

    return await this.wishRepository.delete(id);
  }

  async getLastWishes() {
    return await this.wishRepository.find({
      take: 40,
      order: { createdAt: "DESC" },
    });
  }

  async getTopWishes() {
    return await this.wishRepository.find({
      take: 20,
      order: { copied: "ASC" },
    });
  }

  async copyWish(id: number, user: User): Promise<Wish> {
    const wish = await this.wishRepository.findOneBy({ id });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID: ${id} не найден`);
    }

    if (wish.owner.id === user.id) {
      throw new BadRequestException("Нельзя копировать свой подарок");
    }

    const wishCopy = {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    };

    wish.copied += 1;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newWish = queryRunner.manager.create(Wish, {
        ...wishCopy,
        owner: user,
        raised: 0,
        copied: 0,
      });
      const savedWish = await queryRunner.manager.save(newWish);
      await queryRunner.manager.save(wish);

      await queryRunner.commitTransaction();
      return savedWish;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException("Не удалось скопировать подарок");
    } finally {
      await queryRunner.release();
    }
  }
}
