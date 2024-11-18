import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Se require un nombre' })
    @ApiProperty({ description: 'Nombre de Usuario' })
    name: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Se requiere un Email' })
    @ApiProperty({ description: 'Correo de Usuario' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Se requiere una contraseña' })
    @ApiProperty({ description: 'Contrseña de Usuario' })
    password: string;
}
