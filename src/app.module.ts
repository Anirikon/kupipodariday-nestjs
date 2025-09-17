import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module( {
    controllers: [AppController],
    providers: [AppService],
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'student',
            password: 'root',
            database: 'kupiproday-nest',
            autoLoadEntities: true,
            entities: [],
            synchronize: true,
        })
    ]
})
export class AppModule {}