import { HttpStatus, Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response } from 'src/response/response';

@Injectable()
export class EmployeeService {

  constructor(private prismaService: PrismaService) { }

  async createEmployee(data: Prisma.EmployeeCreateInput): Promise<Response> {
    let response: Response = new Response();
    try {
      response.data = await this.prismaService.employee.create({
        data,
      });
      response.status = HttpStatus.CREATED;
    } catch (error) {
      console.log(error);
      response.error = error.message;
      response.status = HttpStatus.EXPECTATION_FAILED;
    }
    return response;
  }

  async findEmployees(): Promise<Employee[]> {
    return this.prismaService.employee.findMany()
  }

  async findEmployeesBy({ searchString, orderBy }): Promise<Employee[]> {
    const or = searchString ? {
      OR: [
        { email: { contains: searchString } },
        { name: { contains: searchString } },
      ],
    } : {}
    return this.prismaService.employee.findMany({
      where: {
        status: "Active",
        ...or
      },
      orderBy: {
        createdAt: orderBy
      }
    });
  }

  async findEmployee(id: number): Promise<Employee> {
    return null;
  }

  async update(params: { where: Prisma.EmployeeWhereUniqueInput; data: Prisma.EmployeeUpdateInput; }): Promise<Response> {
    let response: Response = new Response();
    const { where, data } = params;
    try {
      response.data = await this.prismaService.employee.update({
        data,
        where,
      });
      response.status = HttpStatus.ACCEPTED;
    } catch (error) {
      console.log(error);
      response.error = error.message;
      response.status = HttpStatus.EXPECTATION_FAILED;
    }
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
