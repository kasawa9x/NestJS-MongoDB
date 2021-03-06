import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-api', {
      useNewUrlParser: true
      // ConfigModule,
      // // MongoDB Connection
      // MongooseModule.forRootAsync({
      //     inject: [ConfigService],
      //     useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    ClientModule,
    ProductModule,
    SaleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
