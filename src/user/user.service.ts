import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectEntityManager()
  private entityManager: EntityManager;

  async findUserByEmail(email: string) {
    return await this.entityManager.findOneBy(User, {
      email,
    });
  }

  @InjectRepository(User)
  private userRepository: Repository<User>;
  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    return foundUser;
  }

  async register(email: string) {
    const newUser = new User();
    newUser.email = email;
    try {
      const alreadySaveNewUser = await this.userRepository.save(newUser);

      return alreadySaveNewUser;
    } catch (e) {
      return newUser;
    }
  }
}
