import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/resp-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nuevo usuario' })
  @ApiBody({ type: CreateUserDto})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el usuario por su ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del usuario',
    example: 1,
  })
  findOne(@Param('id') id: string): Promise<UserResponseDto>  {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar un usuario señalado por su ID' })
  @ApiBody({ type: UpdateUserDto})
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del usuario',
    example: 1,
  })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto,@Body() createUserDto: CreateUserDto): Promise<UserResponseDto>  {
    return this.usersService.update(+id, updateUserDto, createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario señalado por su ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del usuario',
    example: 1,
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(+id);
  }
}
//http://localhost:3000/api-docs