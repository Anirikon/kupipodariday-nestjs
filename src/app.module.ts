import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from "./users/user.model";
import { Wish } from "./wishes/wish.model";
import { Wishlist } from "./wishlists/wishlist.model";
import { Offer } from "./offers/offer.model";
import { AuthModule } from './auth/auth.module';
import { AuthuthService } from './authuth/authuth.service';

@Module( {
    controllers: [],
    providers: [AuthuthService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: String(process.env.POSTGRES_DB),
            autoLoadEntities: true,
            entities: [User, Wish, Wishlist, Offer],
            synchronize: true,
        }),
        UsersModule,
        WishesModule,
        WishlistsModule,
        OffersModule,
        AuthModule,
    ]
})
export class AppModule {}