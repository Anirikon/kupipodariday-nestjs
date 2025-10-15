import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.model';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dtoOffers/create-offer.dto';

@Injectable()
export class OffersService {
    constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>) {}
        async findAll(): Promise<Offer[]> {
            return this.offerRepository.find();
        }

        async findOne(id: number): Promise<Offer | null> {
            const offer = this.offerRepository.findOne({ where: { id }})
            if(!offer) {
                throw new NotFoundException(`Список подарков с ID: ${id} не найден`)
            }
            return offer;
        }

        async create(offer: CreateOfferDto): Promise<CreateOfferDto> {
            return this.offerRepository.save(offer)
        }
}
