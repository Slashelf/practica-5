import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Se require un nombre' })
    name: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Se requiere un Email' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Se requiere una contraseña' })
    password: string;
}
