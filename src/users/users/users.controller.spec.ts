import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/resp-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockUser = { id: 1,  name: 'Test User', email: 'test@example.com',  password: 'password123'};
const viewmockUser = { id: 1, name: 'Test User', email: 'test@example.com'};
const upmockUser = {id: 1,   name: 'Updated User', email: 'updated@example.com', password: 'password123' };
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123', 
    };

    const result = await controller.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should find all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a user by ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when user is not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
    };

    const result = await controller.update(1, updateUserDto, upmockUser); 
    expect(result).toEqual(upmockUser);
    expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  
  it('should throw NotFoundException when updating a non-existing user', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
    const updateUserDto: UpdateUserDto = {
      email: 'nonexistent@example.com',
      name: 'Non-existent User',
    };
    await expect(controller.update(999, updateUserDto, mockUser)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException when updating with an existing email', async () => {
    const updateUserDto: UpdateUserDto = {
      email: 'existing@example.com',
      name: 'Updated User',
    };
    jest.spyOn(service, 'update').mockRejectedValue(new BadRequestException('Email already exists'));
    await expect(controller.update(1, updateUserDto, mockUser)).rejects.toThrow(BadRequestException);
  });

  it('should delete a user', async () => {
    const result = await controller.delete(1);
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when deleting a non-existing user', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
    await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
  });
});
