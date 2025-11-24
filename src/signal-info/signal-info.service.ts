import { Injectable } from '@nestjs/common';
import { CreateSignalInfoDto } from './dto/create-signal-info.dto';
import { UpdateSignalInfoDto } from './dto/update-signal-info.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { SignalInfo } from './entities/signal-info.entity';

@Injectable()
export class SignalInfoService {
  @InjectEntityManager()
  private manager: EntityManager;
  async create(createSignalInfoDto: CreateSignalInfoDto) {
    const res = await this.manager.save(SignalInfo, createSignalInfoDto);
    console.log(res, 'resres');
    return res;
  }

  async findFromUserId(userId) {
    return await this.manager.find(SignalInfo, {
      where: { userId },
    });
  }

  async remove(signal_id: number) {
    await this.manager.delete(SignalInfo, {
      signal_id,
    });
  }
}
