import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SetPasswordDto {
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(32, {
    message: 'La contraseña no puede tener más de 32 caracteres',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe incluir al menos una letra mayúscula',
  })
  @Matches(/[a-z]/, {
    message: 'La contraseña debe incluir al menos una letra minúscula',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe incluir al menos un número',
  })
  @Matches(/[\W_]/, {
    message: 'La contraseña debe incluir al menos un carácter especial',
  })
  password: string;

  @IsString()
  confirmPassword: string;
}
