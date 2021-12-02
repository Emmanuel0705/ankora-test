import { IsEmail } from 'class-validator';

class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;
}

export { CreateUserDto };
