import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Tokens } from './interface/type-token';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginAuthDto): Promise<Tokens> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch)
      throw new NotImplementedException('The password is incorrect');

    return {
      accessToken: await this.jwtService.signAsync({
        userId: user.email,
      }),
    };
  }

  async signup(registerUserDto: RegisterAuthDto): Promise<Tokens> {
    const { email, password, repeatPassword } = registerUserDto;

    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (user) throw new NotFoundException(`user found for emal: ${email}`);

    if (password !== repeatPassword)
      throw new BadRequestException("passowrds aren't equals");

    const newUser = this.userRepository.create({
      email,
      password: await argon2.hash(password),
    });

    const savedUser = await this.userRepository.save(newUser);

    return {
      accessToken: await this.jwtService.signAsync({
        userId: savedUser.email,
      }),
    };
  }

  async googleLogin(registerEmail: RegisterAuthDto): Promise<Tokens> {
    const { email } = registerEmail;

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        email,
      });
      await this.userRepository.save(user);
    }

    return {
      accessToken: await this.jwtService.signAsync({
        userId: user.email,
      }),
    };
  }
}
