import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/resp-user.dto'
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existeGmail = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (existeGmail) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return new UserResponseDto(newUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => new UserResponseDto(user));
  }

  findOne(id: number): Promise<UserResponseDto> {
    return this.userRepository.findOneBy({ id }).then((user) => {
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return new UserResponseDto(user);;
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto,createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existeGmail = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (existeGmail) {
      throw new BadRequestException('Email already exists');
    }
    
    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (updateResult.affected === 0) {
      throw new NotFoundException(`User not found`);
    }
   
    return this.findOne(id);
  }
  
  async remove(id: number): Promise<void> {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User not found`);
    }
    throw new HttpException(
      `User deleted successfully`,
      HttpStatus.OK,
    );
  }
}
