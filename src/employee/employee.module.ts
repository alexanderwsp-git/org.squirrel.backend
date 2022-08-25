import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYEE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/notification'],
          queue: 'api-message',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService]
})
export class EmployeeModule { }
