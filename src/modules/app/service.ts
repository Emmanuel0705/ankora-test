import { Injectable } from '@nestjs/common';
import PrismaService from '@services/prisma';
import { Record } from '@prisma/client';
import { v4 as uuid } from 'uuid';

type RecordCreateInput = {
  documentId: string;
  title: string;
  url: string;
  isPaid: boolean;
  price: string;
  numSubscribers: number;
  numReviews: number;
  numPublishedLectures: number;
  instructionalLevel: string;
  contentInfo: string;
  publishedTime: string;
  Is_Paid?: string;
  Total?: number;
  Column1?: string;
  uid: string;
};

@Injectable()
class AppService {
  constructor(private prisma: PrismaService) {}

  async getRecordWithDocumentId(documentId: string): Promise<Record[] | null> {
    const records = await this.prisma.record.findMany({
      where: { documentId },
    });
    return records;
  }
  async getRecordWithDataId(uid: string): Promise<Record | null> {
    const records = await this.prisma.record.findFirst({
      where: { uid },
    });
    return records;
  }

  async createRecord(data: Array<RecordCreateInput>): Promise<any> {
    return this.prisma.record.createMany({
      data,
    });
  }

  filteredData = (jsonArray: Array<any>): Array<any> => {
    const data: any = [];
    const documentId = uuid();
    jsonArray.forEach((e: any) => {
      const filterData: RecordCreateInput = {
        documentId,
        uid: e.id,
        title: e.title,
        url: e.url,
        isPaid: Boolean(e.isPaid),
        price: e.price,
        numSubscribers: Number(e.numSubscribers),
        numReviews: Number(e.numReviews),
        numPublishedLectures: Number(e.numPublishedLectures),
        instructionalLevel: e.instructionalLevel,
        contentInfo: e.contentInfo,
        publishedTime: e.publishedTime,
      };
      if (e.Is_Paid) filterData.Is_Paid = e.Is_Paid;
      if (e.Total) filterData.Total = Number(e.Total);
      if (e.Column1) filterData.Column1 = e.Column1;
      data.push(filterData);
    });
    return data;
  };
}

export default AppService;
