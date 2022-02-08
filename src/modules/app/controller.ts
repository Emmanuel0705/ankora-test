import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import AppService from '@app/service';
import {
  CreateKycDto,
  CreateNodeDto,
  CreateVSDto,
  GetPassCodeDto,
  VerifyDto,
} from '@app/dto';
import { KYC_STATUS } from '@prisma/client';
// import Mailer from '@services/mailer';
// new Mailer().sendSuccessEmail(body.email, filterRecord[0].documentId);

@Controller('api')
class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('node')
  async createNode(@Body() body: CreateNodeDto): Promise<any> {
    return await this.appService.createNode(body);
  }

  @Post('verification-service')
  async createVS(@Body() body: CreateVSDto): Promise<any> {
    return await this.appService.createVS(body);
  }

  @Get('stats')
  async getStats(): Promise<any> {
    return await this.appService.getStats();
  }

  @Get('kyc/:nin')
  async requestKyc(@Param() params: any): Promise<any> {
    return await this.appService.requestKyc(params.nin);
  }

  @Post('consent')
  async GetUserWithPassCode(@Body() body: GetPassCodeDto): Promise<any> {
    return await this.appService.getKycWithPassCode(body);
  }

  @Post('kyc')
  async CreateKyc(@Body() body: CreateKycDto): Promise<any> {
    return await this.appService.createKyc(body);
  }
  @Put('verify')
  async UpdateKyc(@Body() body: VerifyDto): Promise<any> {
    return await this.appService.VerifyKyc(body);
  }
}

export default AppController;
