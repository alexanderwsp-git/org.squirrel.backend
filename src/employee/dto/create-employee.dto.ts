import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {

    @ApiProperty({ example: 'alexander@gmail.com', description: 'The employee email' })
    public email: string;

    @ApiProperty({ example: 'Alexander', description: 'The user name' })
    public name: string;

    @ApiProperty({ example: 'Active', description: 'The status' })
    public status: string;

}