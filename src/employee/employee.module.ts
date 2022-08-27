import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYEE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.URL_RMQ],
          queue: 'api-message',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    PrismaModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
