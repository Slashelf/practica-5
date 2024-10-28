import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';

describe('Users Integration (UsersService)', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'users_test',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    const connection = repository.manager.connection;
    if (connection.isInitialized) {
      await connection.destroy();
    }
  });

  afterEach(async () => {
    await repository.query('DELETE FROM user;');
  });

  it('Debería crear un nuevo usuario en la base de datos', async () => {
    const nuevoUsuario = {
      name: 'Usuario de prueba',
      email: 'email@example.com',
      password: 'password123',
    };

    const userCreada = await service.create(nuevoUsuario);
    expect(userCreada).toHaveProperty('id');
    expect(userCreada.name).toEqual(nuevoUsuario.name);
    expect(userCreada.email).toEqual(nuevoUsuario.email);

    const usersEnBaseDatos = await repository.findOneBy({ id: userCreada.id });
    expect(usersEnBaseDatos).toBeDefined();
    expect(usersEnBaseDatos.name).toEqual(nuevoUsuario.name);
    expect(usersEnBaseDatos.email).toEqual(nuevoUsuario.email);
    expect(usersEnBaseDatos.password).toEqual(nuevoUsuario.password);
  });

  it('Debería fallar al intentar crear un usuario con un email ya existente', async () => {
    const nuevoUsuario = await repository.save({
      name: 'Usuario existente',
      email: 'existe@example.com',
      password: 'password123',
    });

    const createUserDto = {
      name: 'Otro Usuario',
      email: 'existe@example.com',
      password: 'password456',
    };

    await expect(service.create(createUserDto)).rejects.toThrow(
      new BadRequestException('Email already exists'),
    );
  });

  it('Debería obtener todos los usuarios', async () => {
    const user1 = await repository.save({
      name: 'Usuario 1',
      email: 'usuario1@example.com',
      password: 'password123',
    });
    const user2 = await repository.save({
      name: 'Usuario 2',
      email: 'usuario2@example.com',
      password: 'password456',
    });

    const usuarios = await service.findAll();
    expect(usuarios.length).toBe(2);
    expect(usuarios[0].name).toEqual(user1.name);
    expect(usuarios[1].name).toEqual(user2.name);
  });

  it('Debería obtener un usuario por ID', async () => {
    const nuevoUsuario = await repository.save({
      name: 'Usuario espesifico',
      email: 'email especifico',
      password: 'password123',
    });

    const userEncontrada = await service.findOne(nuevoUsuario.id);
    expect(userEncontrada).toBeDefined();
    expect(userEncontrada.name).toEqual('Usuario espesifico');
    expect(userEncontrada.email).toEqual('email especifico');
  });

  it('Debería lanzar NotFoundException si el usuario no existe al buscar por ID', async () => {
    const idInexistente = 999;
    await expect(service.findOne(idInexistente)).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });

  it('Debería actualizar un usuario existente', async () => {
    const nuevoUsuario = await repository.save({
      name: 'Usuario antes de actualizar',
      email: 'antes@example.com',
      password: 'password123',
    });

    const updateUserDto = {
      name: 'Usuario actualizado',
      email: 'actualizado@example.com',
    };

    const userActualizada = await service.update(nuevoUsuario.id, updateUserDto, {
        name: 'Nota actualizada',
        email: 'Contenido actualizado',
        password: 'password'
      });

    expect(userActualizada).toBeDefined();
    expect(userActualizada.name).toEqual(updateUserDto.name);
    expect(userActualizada.email).toEqual(updateUserDto.email);
  });

  it('Debería fallar al actualizar un usuario con un email ya existente', async () => {
    const usuario1 = await repository.save({
      name: 'Usuario 1',
      email: 'usuario1@example.com',
      password: 'password123',
    });
    const usuario2 = await repository.save({
      name: 'Usuario 2',
      email: 'usuario2@example.com',
      password: 'password456',
    });

    const updateUserDto = {
      name: 'Usuario actualizado',
      email: 'usuario1@example.com', // El email ya existe
    };

    await expect(
      service.update(usuario2.id, updateUserDto, {
        name: 'Nota actualizada',
        email: 'Contenido actualizado',
        password: 'password'
      }),
    ).rejects.toThrow(new BadRequestException('Email already exists'));
  });

  it('Debería eliminar un usuario existente', async () => {
    const nuevoUsuario = await repository.save({
      name: 'User para eliminar',
      email: 'eliminar@example.com',
      password: 'password123',
    });

    await expect(service.remove(nuevoUsuario.id)).rejects.toThrow(
      new HttpException('User deleted successfully', HttpStatus.OK),
    );

    const userEliminado = await repository.findOneBy({ id: nuevoUsuario.id });
    expect(userEliminado).toBeNull();
  });

  it('Debería lanzar NotFoundException al no encontrar un usuario para eliminar', async () => {
    const idInexistente = 999;
    await expect(service.remove(idInexistente)).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });
});




/*import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('Users Integration (UsersService)', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'users_test',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    const connection = repository.manager.connection;
    if (connection.isInitialized) {
      await connection.destroy();
    }
  });

  afterEach(async () => {
    await repository.query('DELETE FROM user;');
  });

  it('Deberia crear un nuevo usuario en la base de datos', async () => {
    const nuevoUsuario = {
      name: 'Usuario de prueba',
      email: 'email de prueba',
      password: 'password de prueba'
    };

    const userCreada = await service.create(nuevoUsuario);
    expect(userCreada).toHaveProperty('id');
    expect(userCreada.name).toEqual(nuevoUsuario.name);
    expect(userCreada.email).toEqual(nuevoUsuario.email);

    const usersEnBaseDatos = await repository.findOneBy({ id: userCreada.id });
    expect(usersEnBaseDatos).toBeDefined();
    expect(usersEnBaseDatos.name).toEqual(nuevoUsuario.name);
    expect(usersEnBaseDatos.email).toEqual(nuevoUsuario.email);
    expect(usersEnBaseDatos.password).toEqual(nuevoUsuario.password);
  });

  it('Deberia obtener todas lo usuarios de la base de datos', async () => {
    await repository.query('DELETE FROM user;');

    await repository.save([
      { name: 'User 1', email: 'User1@gmail.com' },
      { name: 'User 2', email: 'User2@gmail.com' },
    ]);

    const users = await service.findAll();
    expect(users.length).toBe(2);
    expect(users[0].name).toBe('User 1');
    expect(users[1].name).toBe('User 2');
  });

  it('Debería obtener un usuario por ID', async () => {
    await repository.query('DELETE FROM user;');

    const nuevoUsuario = await repository.save({
      name: 'Usuario espesifico',
      email: 'email especifico',
    });

    const userEncontrada= await service.findOne(nuevoUsuario.id);

    expect(userEncontrada).toBeDefined();
    expect(userEncontrada.name).toEqual('Usuario espesifico');
    expect(userEncontrada.email).toEqual('email especifico');
  });

  it('Debería lanzar NotFoundException al no encontrar un usuario por ID', async () => {
    const userInexistente = 999;
    try {
      await service.findOne(userInexistente);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`User not found`);
    }
  });

  it('Debería actualizar una nota existente', async () => {
    await repository.query('DELETE FROM user    ;');

    const nuevoUsuario = await repository.save({
      name: 'Nota antes de actualizar',
      email: 'Contenido antes de actualizar',
    });

    const notaActualizada = await service.update(nuevoUsuario.id, {
      name: 'Nota actualizada',
      email: 'Contenido actualizado',
    },{
        name: 'Nota actualizada',
        email: 'Contenido actualizado',
        password: 'password'
      });

    expect(notaActualizada).toBeDefined();
    expect(notaActualizada.name).toEqual('Nota actualizada');
    expect(notaActualizada.email).toEqual('Contenido actualizado');

    const notasEnBaseDatos = await repository.findOneBy({ id: nuevoUsuario.id });
    expect(notasEnBaseDatos).toBeDefined();
    expect(notasEnBaseDatos.name).toEqual(notaActualizada.name);
    expect(notasEnBaseDatos.email).toEqual(notaActualizada.email);
  });

  it('Debería lanzar NotFoundException al no encontrar una nota para modificar', async () => {
    const notaInexistente = 999;
    try {
      await service.update(notaInexistente, {
        name: 'Nota actualizada',
        email: 'Contenido actualizado',
      },{
        name: 'Nota actualizada',
        email: 'Contenido actualizado',
        password: 'password'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`User not found`);
    }
  });

  it('Debería eliminar un usuario existente', async () => {
    await repository.query('DELETE FROM user;');

    const nuevoUsuario = await repository.save({
      name: 'User para eliminar',
      email: 'email para eliminar',
    });

    try {
      await service.remove(nuevoUsuario.id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.OK);
      expect(error.message).toBe(
        `User deleted successfully`,
      );
    }

    const notaEliminada = await repository.findOneBy({ id: nuevoUsuario.id });
    expect(notaEliminada).toBeNull();
  });

  it('Debería lanzar NotFoundException al no encontrar una nota para eliminar', async () => {
    const notaInexistente = 999;
    try {
      await service.remove(notaInexistente);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`User not found`);
    }
  });
});*/