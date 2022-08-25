import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { Employee as EmployeeModel, Prisma } from '@prisma/client';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response } from 'src/response/response';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Res() res): Promise<Response> {
    let response: Response = await this.employeeService.createEmployee(createEmployeeDto);
    return res.status(response.status).send(response);
  }

  @Get()
  async findEmployees(): Promise<EmployeeModel[]> {
    return this.employeeService.findEmployees();
  }

  @Get('/findBy')
  async findEmployeesBy(@Query('searchString') searchString?: string, @Query('orderBy') orderBy?: 'asc' | 'desc'): Promise<EmployeeModel[]> {
    return this.employeeService.findEmployeesBy({
      searchString,
      orderBy
    });
  }

  @Get(':id')
  async findEmployee(@Param('id') id: string): Promise<EmployeeModel> {
    return this.employeeService.findEmployee(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Res() res) {
    let response: Response = await this.employeeService.update({
      where: { id: Number(id) },
      data: updateEmployeeDto,
    });
    return res.status(response.status).send(response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
