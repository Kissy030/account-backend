import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SignalInfoService } from './signal-info.service';
import { CreateSignalInfoDto } from './dto/create-signal-info.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('signal-info')
export class SignalInfoController {
  constructor(private readonly signalInfoService: SignalInfoService) {}

  @UseGuards(AuthGuard)
  @Post('/addNewSignal')
  async create(
    @Body() createAccountInfoDto: CreateSignalInfoDto,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user || {};
    const params = { ...createAccountInfoDto, userId: id };
    const res = await this.signalInfoService.create(params);
    const result = { ...res, statusCode: 200 };
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/getSignalList')
  async findAll(@Req() request) {
    const { user } = request;
    const { id } = user;
    const res = await this.signalInfoService.findFromUserId(id);
    console.log(res, 'aaa111');
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() body: { signal_id: number }) {
    const { signal_id } = body;
    if (signal_id) await this.signalInfoService.remove(signal_id);
    return { message: '删除成功', statusCode: 200 };
  }
}
