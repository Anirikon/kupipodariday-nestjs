import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Offer } from "./offer.model";
import { Repository } from "typeorm";
import { CreateOfferDto } from "./dtoOffers/create-offer.dto";
import { User } from "src/users/user.model";
import { Wish } from "src/wishes/wish.model";
import { DataSource } from "typeorm/browser";

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    private dataSource: DataSource,
  ) {}
  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer | null> {
    const offer = this.offerRepository.findOne({ where: { id } });
    if (!offer) {
      throw new NotFoundException(`Список подарков с ID: ${id} не найден`);
    }
    return offer;
  }

  async create(id: number, offer: CreateOfferDto): Promise<CreateOfferDto> {
    const { amount, hidden, itemId } = offer;
    const user = await this.userRepository.findOneBy({ id: id });
    const wish = await this.wishRepository.findOne({
      where: { id: itemId },
      relations: ["owner"],
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    if (!wish) {
      throw new NotFoundException("Подарков нет");
    }

    if (user.id === wish.owner.id) {
      throw new BadRequestException("Нельзя скидываться на свой подарок");
    }

    if (wish.raised + amount > wish.price) {
      throw new BadRequestException("Превышение лимита суммы подарка");
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      wish.raised += amount;
      const newOffer = queryRunner.manager.create(Offer, {
        amount,
        hidden,
        user,
        item: wish,
      });
      const savedOffer = await queryRunner.manager.save(newOffer);
      await queryRunner.manager.save(wish);
      await queryRunner.commitTransaction();
      return {
        itemId: savedOffer.item.id,
        amount: savedOffer.amount,
        hidden: savedOffer.hidden,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        err,
        `Ошибка: '${err}',Не удалось создать предложение`,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
