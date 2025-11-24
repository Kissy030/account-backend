import { Module } from '@nestjs/common';
import { SignalInfoService } from './signal-info.service';
import { SignalInfoController } from './signal-info.controller';

@Module({
  controllers: [SignalInfoController],
  providers: [SignalInfoService],
})
export class SignalInfoModule {}
