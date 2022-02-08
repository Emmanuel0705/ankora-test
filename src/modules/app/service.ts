import { Injectable } from '@nestjs/common';
import PrismaService from '@services/prisma';
import { Kyc, Node, VerificationService } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import {
  CreateKycDto,
  CreateNodeDto,
  CreateVSDto,
  GetPassCodeDto,
  VerifyDto,
} from './dto';
import Mailer from '@services/mailer';

@Injectable()
class AppService {
  constructor(private prisma: PrismaService) {}

  async createNode(data: CreateNodeDto): Promise<Node> {
    const node = await this.prisma.node.create({ data });
    return node;
  }

  async getNodes(): Promise<Node[]> {
    return await this.prisma.node.findMany();
  }

  async createVS(data: CreateVSDto): Promise<VerificationService> {
    const vs = await this.prisma.verificationService.create({ data });
    return vs;
  }

  async getVS(): Promise<VerificationService[]> {
    return await this.prisma.verificationService.findMany();
  }

  async createKyc(data: CreateKycDto): Promise<Kyc> {
    const kyc = await this.prisma.kyc.create({ data });
    return kyc;
  }
  async requestKyc(nin: string): Promise<any> {
    console.log(nin);
    const kyc = await this.prisma.kyc.findFirst({ where: { nin } });
    if (kyc) {
      const code = Math.floor(1000 + Math.random() * 9000);
      await this.prisma.kyc.update({
        data: { passCode: `${code}` },
        where: { id: kyc.id },
      });

      new Mailer().sendRequestEmail(kyc.email, code);
      return { status: 'success', message: 'Passcode Has been sent' };
    } else {
      return { status: 'fail', message: 'no user with this NIN ' };
    }
  }

  async getKycWithPassCode(data: GetPassCodeDto): Promise<any> {
    const kyc = await this.prisma.kyc.findFirst({
      where: { passCode: data.code },
    });
    if (kyc) {
      await this.prisma.kyc.update({
        data: { passCode: undefined },
        where: { id: kyc.id },
      });

      return kyc;
    } else {
      return { status: 'fail', message: 'Invalid Passcode ' };
    }
  }
  async VerifyKyc(data: VerifyDto): Promise<Kyc> {
    console.log(data);
    const kyc = await this.prisma.kyc.update({
      where: { id: data.userId },
      data: { status: data.status },
    });
    return kyc;
  }

  async getStats(): Promise<any> {
    const nodes = await this.prisma.node.findMany();
    const vs = await this.prisma.verificationService.findMany();
    return {
      nodes: nodes.length,
      verificationService: vs.length,
    };
  }
}

export default AppService;
