import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './interface/type-token';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { EmailService } from 'src/email/email.service';
import { AuthGuard } from './guard/auth.guard';
import { SetPasswordDto } from './dto/set-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() registerAuthDto: RegisterAuthDto): Promise<Tokens> {
    return this.authService.signup(registerAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<Tokens> {
    return this.authService.login(loginAuthDto);
  }

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req): Promise<Tokens> {
    const user = req.user;

    if (!user?.email)
      throw new NotFoundException('Correo electrónico no encontrado');

    const tokens = await this.authService.googleAuth(user);

    await this.emailService.sendVerificationCode(user.email);

    return tokens;
  }

  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async verifyCode(
    @Request() req,
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<boolean> {
    const verify = await this.authService.verifyCode(
      req.user.userId,
      verifyCodeDto.code,
    );

    return verify;
  }

  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async setPassword(
    @Request() req,
    @Body() settPasswordDto: SetPasswordDto,
  ): Promise<boolean> {
    return this.authService.setPassword(req.user.userId, settPasswordDto);
  }
}
