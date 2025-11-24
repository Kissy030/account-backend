import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AccountInfoService } from './account-info.service';
import { CreateAccountInfoDto } from './dto/create-account-info.dto';
import { UpdateAccountInfoDto } from './dto/update-account-info.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('account-info')
export class AccountInfoController {
  constructor(private readonly accountInfoService: AccountInfoService) {}

  @UseGuards(AuthGuard)
  @Post('/addNewAccount')
  async create(
    @Body() createAccountInfoDto: CreateAccountInfoDto,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user || {};
    const params = { ...createAccountInfoDto, userId: id };
    const res = await this.accountInfoService.create(params);

    return { ...res, statuCode: 200 };
  }

  @UseGuards(AuthGuard)
  @Get('/getAccountList')
  async findAll(@Req() request) {
    const { user } = request;
    const { id } = user;
    return await this.accountInfoService.findFromUserId(id);
  }

  @UseGuards(AuthGuard)
  @Get('/getAccountListFromType')
  async findAllFromAccountType(
    @Query('accountType') accountType: string,
    @Query('accountTime') accountTime: string,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user;
    const result = await this.accountInfoService.findFromAccountType(
      id,
      accountTime,
      accountType,
    );

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/getAccountListFromTypeToChart')
  async findAllFromAccountTypeToChart(
    @Query('accountType') accountType: string,
    @Query('accountTime') accountTime: string,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user;
    const result = await this.accountInfoService.findFromAccountTypeToChart(
      id,
      accountTime,
      accountType,
    );

    console.log(result, '00788');
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/getAccounts')
  async getAccounts(@Query('accountTime') accountTime: string, @Req() request) {
    const { user } = request;
    const { id } = user;
    const result = await this.accountInfoService.findAccounts(id, accountTime);
    console.log(result, '111');

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/getDIYTimeAccounts')
  async getDIYTimeAccounts(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user;
    const result = await this.accountInfoService.findDIYTimeAccounts(
      id,
      startTime,
      endTime,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/getDIYTimeAccountsByAccountType')
  async getDIYTimeAccountsByAccountType(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('accountType') accountType: string,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user;
    const result = await this.accountInfoService.findFromAccountTypeAndDIYTime(
      id,
      startTime,
      endTime,
      accountType,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/getDIYTimeAccountsByAccountTypeToChart')
  async getDIYTimeAccountsByAccountTypeToChart(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('accountType') accountType: string,
    @Req() request,
  ) {
    const { user } = request;
    const { id } = user;
    const result =
      await this.accountInfoService.findFromAccountTypeAndDIYTimeToChart(
        id,
        startTime,
        endTime,
        accountType,
      );
    return result;
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  async delete(@Body() body: { account_id: number }) {
    const { account_id } = body;
    if (account_id) await this.accountInfoService.remove(account_id);
    return { message: '删除成功', statusCode: 200 };
  }
}
