import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException, HttpException } from '@nestjs/common';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' };
const viewmockUser = { id: 1, name: 'Test User', email: 'test@example.com'};
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });






  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser as User);

    const result = await service.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });


    expect(result).toEqual(mockUser);
    expect(repository.save).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
  });


  it('should retrieve all users', async () => {
    const mockUsers = [
      { id: 1, name: 'Test User 1', email: 'test1@example.com' },
      { id: 2, name: 'Test User 2', email: 'test2@example.com' },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(mockUsers as User[]);

    const result = await service.findAll();

    expect(result).toEqual(mockUsers);
    expect(repository.find).toHaveBeenCalled();
  });



  it('should retrieve a user by id', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser as User);

    // trabaja el metodo del servicio
    const result = await service.findOne(1);

    expect(result).toEqual(viewmockUser);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should throw a NotFoundException if the user does not exist', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    try {
      await service.findOne(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
      expect(error.getStatus()).toBe(404);
    }

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
  
  it('should update a user', async () => {
    const updatedUser = { ...viewmockUser, name: 'Updated User' };

    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedUser as User);

    const result = await service.update(1, {
      name: 'Updated User',
      email: 'updated@example.com',
    }, mockUser);

    expect(result).toEqual(updatedUser);
    expect(repository.update).toHaveBeenCalledWith(1, {
      name: 'Updated User',
      email: 'updated@example.com',
    });
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });




  
  it('should throw NotFoundException if the user to update does not exist', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any);
  
   
    try {
      await service.update(1, {
        name: 'Non-existing User',
        email: 'nonexisting@example.com',
      }, mockUser);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
      expect(error.getStatus()).toBe(404);
    }

    expect(repository.update).toHaveBeenCalledWith(1, {
      name: 'Non-existing User',
      email: 'nonexisting@example.com',
    });

  });



  it('should remove a user', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

    try {
      await service.remove(1);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User deleted successfully');
      expect(error.getStatus()).toBe(200);
    }

  });

  it('should throw NotFoundException if the user to remove does not exist', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    await expect(service.remove(1)).rejects.toThrow('User not found');
  });
});

