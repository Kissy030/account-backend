import { PartialType } from '@nestjs/mapped-types';
import { CreateSignalInfoDto } from './create-signal-info.dto';

export class UpdateSignalInfoDto extends PartialType(CreateSignalInfoDto) {}
