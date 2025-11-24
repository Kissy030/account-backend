import { Module } from '@nestjs/common';
import { AccountInfoService } from './account-info.service';
import { AccountInfoController } from './account-info.controller';

@Module({
  controllers: [AccountInfoController],
  providers: [AccountInfoService],
})
export class AccountInfoModule {}
