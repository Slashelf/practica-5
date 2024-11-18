import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Nombre de Usuario', required: false })
    name?: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Correo de usuario', required: false })
    email?: string;

}
