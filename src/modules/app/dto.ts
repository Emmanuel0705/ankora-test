import { IsEmail, IsString } from 'class-validator';
import { KYC_STATUS } from '@prisma/client';

class CreateKycDto {
  @IsString()
  fullName: string;
  @IsString()
  dob: string;
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;
  @IsString()
  nin: string;
}

class CreateNodeDto {
  @IsString()
  name: string;
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;
  @IsString()
  ip: string;
}

class GetPassCodeDto {
  @IsString()
  code: string;
}

class CreateVSDto {
  @IsString()
  name: string;
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;
}

class VerifyDto {
  @IsString()
  status: KYC_STATUS;
  @IsString()
  userId: string;
}

export {
  CreateKycDto,
  CreateNodeDto,
  CreateVSDto,
  GetPassCodeDto,
  KYC_STATUS,
  VerifyDto,
};
