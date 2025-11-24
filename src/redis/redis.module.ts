import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';

@Global()
@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: process.env.REDIS_HOST || 'localhost', // ✅ 从环境变量读取
            port: parseInt(process.env.REDIS_PORT ?? '6379', 10) || 6379,
          },
        });

        client.on('error', (err) => {
          console.error('Redis Client Error:', err);
        });

        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
