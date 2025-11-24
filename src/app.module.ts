import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MailModule } from './mail/mail.module';
import { RedisModule } from './redis/redis.module';
import { AccountInfoModule } from './account-info/account-info.module';
import { AccountInfo } from './account-info/entities/account-info.entity';
import { SignalInfoModule } from './signal-info/signal-info.module';
import { SignalInfo } from './signal-info/entities/signal-info.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'fallback-dev-secret'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'mysql-container',
        username: 'root',
        password: '123456',
        database: 'test',
        entities: [User, AccountInfo, SignalInfo],
        synchronize: false,
        logging: true,
        poolSize: 10,
        connectorPackage: 'mysql2',
        extra: {
          // authPlugin: 'sha256_password',
          decimalNumbers: true,
        },
      }),
      inject: [ConfigService],
    }),

    UserModule,
    MailModule,
    RedisModule,
    AccountInfoModule,
    SignalInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
