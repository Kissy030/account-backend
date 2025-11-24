import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSignalInfoDto {
  @IsString()
  @IsNotEmpty({ message: '标题为空!!!' })
  signal_title: string;

  @IsString()
  @IsNotEmpty({ message: 'icon为空!!!' })
  signal_icon: string;
}
