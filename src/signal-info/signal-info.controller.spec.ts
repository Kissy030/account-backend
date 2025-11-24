import { Test, TestingModule } from '@nestjs/testing';
import { SignalInfoController } from './signal-info.controller';
import { SignalInfoService } from './signal-info.service';

describe('SignalInfoController', () => {
  let controller: SignalInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalInfoController],
      providers: [SignalInfoService],
    }).compile();

    controller = module.get<SignalInfoController>(SignalInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
