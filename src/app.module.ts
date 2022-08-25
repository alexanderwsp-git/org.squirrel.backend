import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
