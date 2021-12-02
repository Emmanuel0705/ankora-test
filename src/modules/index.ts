import { Module } from '@nestjs/common';
import AppModule from '@app/module';

@Module({
  imports: [AppModule],
})
export default class Modules {}
