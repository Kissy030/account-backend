import { Test, TestingModule } from '@nestjs/testing';
import { SignalInfoService } from './signal-info.service';

describe('SignalInfoService', () => {
  let service: SignalInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalInfoService],
    }).compile();

    service = module.get<SignalInfoService>(SignalInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
