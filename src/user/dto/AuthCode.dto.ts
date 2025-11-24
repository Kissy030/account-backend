import {
  IsEmail,
  IsNotEmpty,
  IsString,
  isString,
  Length,
} from 'class-validator';

export class AuthCodeDto {
  @IsString()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;
}
