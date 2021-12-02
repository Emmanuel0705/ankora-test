import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import AppService from '@app/service';
import { CreateUserDto } from '@app/dto';
import csv from 'csvtojson';
import { FileInterceptor } from '@nestjs/platform-express';
import Mailer from '@services/mailer';

@Controller('record')
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':documentId')
  async getRecords(@Param() params: { documentId: string }): Promise<any> {
    return await this.appService.getRecordWithDocumentId(params.documentId);
  }
  @Get('data/:uid')
  async getSingleDocument(@Param() params: { uid: string }): Promise<any> {
    return await this.appService.getRecordWithDataId(params.uid);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createRecord(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      const jsonArray = await csv().fromString(file.buffer.toString());
      //
      const filterRecord = this.appService.filteredData(jsonArray);
      const res = await this.appService.createRecord(filterRecord);
      if (res) {
        new Mailer().sendSuccessEmail(body.email, filterRecord[0].documentId);
        return {
          status: 'success',
          documentId: filterRecord[0].documentId,
          message: `Your Document has been uploaded successfully, pls use document ID ${filterRecord[0].documentId} to query your document data`,
          total: res.count,
        };
      }
    } catch (error) {
      console.log(error.message);
      return {
        status: 'failed',
        message: 'Pls upload a valid document',
      };
    }
  }
}

export default AppController;
