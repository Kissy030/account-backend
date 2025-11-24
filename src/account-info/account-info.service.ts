import { Injectable } from '@nestjs/common';
import { CreateAccountInfoDto } from './dto/create-account-info.dto';
import { UpdateAccountInfoDto } from './dto/update-account-info.dto';
import { EntityManager, Raw } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { AccountInfo } from './entities/account-info.entity';

@Injectable()
export class AccountInfoService {
  @InjectEntityManager()
  private manager: EntityManager;
  async create(createAccountInfoDto: CreateAccountInfoDto) {
    const res = await this.manager.save(AccountInfo, createAccountInfoDto);
    console.log(res, 'resres');
    return res;
  }

  async findFromUserId(userId) {
    return await this.manager.find(AccountInfo, {
      where: { userId },
      order: {
        account_time: 'DESC',
      },
    });
  }

  async findAccounts(userId: number, account_time: string) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let start, end;
    let output = 0;
    let income = 0;
    switch (account_time) {
      case 'thisMonth':
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 1);
        break;
      case 'lastMonth':
        start = new Date(year, month - 1, 1);
        end = new Date(year, month, 1);
        break;
      case 'thisYear':
        start = new Date(year, 0, 1);
        end = new Date(year + 1, 0, 1);
        break;
      default:
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 1);
    }

    const accounts = await this.manager.find(AccountInfo, {
      where: {
        userId,
        account_time: Raw(
          (columnAlias) => `${columnAlias} >= :start AND ${columnAlias} < :end`,
          { start, end },
        ),
      },
      order: {
        account_time: 'DESC',
      },
    });
    for (const item of accounts) {
      let amount: number;
      amount = item.account_ammount;
      if (item.account_type === 'income') {
        income += amount;
      } else {
        output += amount;
      }
    }
    const result = {
      accounts,
      output,
      income,
      netIncome: income - output,
    };
    return result;
  }

  async findFromAccountType(userId, account_time: string, account_type) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let start, end;
    switch (account_time) {
      case 'thisMonth':
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 1);
        break;
      case 'lastMonth':
        start = new Date(year, month - 1, 1);
        end = new Date(year, month, 1);
        break;
      case 'thisYear':
        start = new Date(year, 0, 1);
        end = new Date(year + 1, 0, 1);
        break;
      default:
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 1);
    }
    return await this.manager.find(AccountInfo, {
      where: {
        userId,
        account_time: Raw(
          (columnAlias) => `${columnAlias} >= :start AND ${columnAlias} < :end`,
          { start, end },
        ),
        account_type,
      },
      order: {
        account_time: 'DESC',
      },
    });
  }

  async findFromAccountTypeToChart(userId, account_time: string, account_type) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let start, end;
    switch (account_time) {
      case 'thisMonth':
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 1);
        break;
      case 'lastMonth':
        start = new Date(year, month - 1, 1);
        end = new Date(year, month, 1);
        break;
      case 'thisYear':
        start = new Date(year, 0, 1);
        end = new Date(year + 1, 0, 1);
        break;
      default:
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 1);
    }
    const rawData = await this.manager.find(AccountInfo, {
      where: {
        userId,
        account_time: Raw(
          (columnAlias) => `${columnAlias} >= :start AND ${columnAlias} < :end`,
          { start, end },
        ),
        account_type,
      },
      order: {
        account_time: 'DESC',
      },
    });

    const chartData = rawData.reduce((acc, item) => {
      const name = item.account_title;
      const value = item.account_ammount;

      if (acc[name]) {
        acc[name] += value;
      } else {
        acc[name] = value;
      }

      return acc;
    }, {});

    const result = Object.entries(chartData).map(([name, value]) => ({
      name,
      value,
    }));
    return result;
  }

  async findDIYTimeAccounts(
    userId: number,
    startTime: string,
    endTime: string,
  ) {
    const start = new Date(startTime);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endTime);
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);
    let output = 0;
    let income = 0;

    const accounts = await this.manager.find(AccountInfo, {
      where: {
        userId,
        account_time: Raw(
          (columnAlias) => `${columnAlias} >= :start AND ${columnAlias} < :end`,
          { start, end },
        ),
      },
      order: {
        account_time: 'DESC',
      },
    });
    for (const item of accounts) {
      if (item.account_type === 'income') {
        income += item.account_ammount;
      } else {
        output += item.account_ammount;
      }
    }
    const result = {
      accounts,
      output,
      income,
      netIncome: income - output,
    };
    return result;
  }

  async findFromAccountTypeAndDIYTime(
    userId,
    startTime: string,
    endTime: string,
    account_type: string,
  ) {
    const start = new Date(startTime);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endTime);
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    return await this.manager.find(AccountInfo, {
      where: {
        userId,
        account_time: Raw(
          (columnAlias) => `${columnAlias} >= :start AND ${columnAlias} < :end`,
          { start, end },
        ),
        account_type,
      },
      order: {
        account_time: 'DESC',
      },
    });
  }

  async findFromAccountTypeAndDIYTimeToChart(
    userId,
    startTime: string,
    endTime: string,
    account_type: string,
  ) {
    const start = new Date(startTime);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endTime);
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    const rawData = await this.manager.find(AccountInfo, {
      where: {
        userId,
        account_time: Raw(
          (columnAlias) => `${columnAlias} >= :start AND ${columnAlias} < :end`,
          { start, end },
        ),
        account_type,
      },
      order: {
        account_time: 'DESC',
      },
    });
    const chartData = rawData.reduce((acc, item) => {
      const name = item.account_title;
      const value = item.account_ammount;
      if (acc[name]) {
        acc[name] += value;
      } else {
        acc[name] = value;
      }
      return acc;
    }, {});
    const result = Object.entries(chartData).map(([name, value]) => ({
      name,
      value,
    }));
    return result;
  }
  async remove(account_id: number) {
    await this.manager.delete(AccountInfo, {
      account_id,
    });
  }
}
