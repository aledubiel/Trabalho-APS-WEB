import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [TeachersModule],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
