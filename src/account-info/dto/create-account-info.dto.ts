import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAccountInfoDto {
  @IsString()
  @IsNotEmpty({ message: '类型为空!!!' })
  account_type: string;

  @IsString()
  @IsNotEmpty({ message: '标题为空!!!' })
  account_title: string;

  @IsString()
  @IsNotEmpty({ message: 'icon为空!!!' })
  account_icon: string;

  @IsString()
  @IsNotEmpty({ message: '时间为空!!!' })
  account_time: string;

  @IsNumber()
  @IsNotEmpty({ message: '金额为空!!!' })
  account_ammount: number;
}
