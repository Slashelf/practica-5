import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as request from 'supertest';

import { User } from './users/users/entities/user.entity';
import { UsersModule } from './users/users/users.module';
import { CreateUserDto } from './users/users/dto/create-user.dto';
import { UpdateUserDto } from './users/users/dto/update-user.dto';

describe('Users Acceptance', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'users_db_test',
          entities: [User],
          synchronize: true,
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    usersRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  afterEach(async () => {
    await usersRepository.query('DELETE FROM user');
  });
  it('Debería crear un user y retornarlo en la respuesta', async () => {
    const nuevoUsuario: CreateUserDto = {
      name: 'user de prueba',
      email: 'email@gmail.com de prueba',
      password: 'password de prueba'
    };

    const respuestaCrear = await request(app.getHttpServer())
      .post('/users')
      .send(nuevoUsuario);

    expect(respuestaCrear.status).toBe(201);
    expect(respuestaCrear.body.name).toEqual(nuevoUsuario.name);
    expect(respuestaCrear.body.email).toEqual(nuevoUsuario.email);
  });

  it('Debería crear un usuario y lanzar un error si el email ya existe', async () => {
    const nuevoUsuario: CreateUserDto = {
      name: 'user de prueba',
      email: 'email@gmail.com',
      password: 'password123'
    };
  
    const respuestaCrear = await request(app.getHttpServer())
      .post('/users')
      .send(nuevoUsuario);
  
    expect(respuestaCrear.status).toBe(201);
    expect(respuestaCrear.body.name).toEqual(nuevoUsuario.name);
    expect(respuestaCrear.body.email).toEqual(nuevoUsuario.email);

    const respuestaDuplicada = await request(app.getHttpServer())
      .post('/users')
      .send(nuevoUsuario);
  
    expect(respuestaDuplicada.status).toBe(400); // Código de estado para BadRequestException
    expect(respuestaDuplicada.body.message).toBe('Email already exists');
  });

  
  it('Debería obtener todos los users', async () => {
    const respuestaObtener = await request(app.getHttpServer()).get('/users');

    expect(respuestaObtener.status).toBe(200);
    expect(Array.isArray(respuestaObtener.body)).toBeTruthy();
  });
  it('Debería buscar un user por ID', async () => {
    const nuevoUsuario = await usersRepository.save({
      name: 'User de ejemplo',
      email: 'email@gmail.com de ejemplo',
      password: 'password de ejemplo',
    });

    const respuestaBuscar = await request(app.getHttpServer()).get(
      `/users/${nuevoUsuario.id}`,
    );

    expect(respuestaBuscar.status).toBe(200);
    expect(respuestaBuscar.body.name).toEqual(nuevoUsuario.name);
    expect(respuestaBuscar.body.email).toEqual(nuevoUsuario.email);
  });

  it('Debería lanzar NotFoundException al no encontrar un user por ID', async () => {
    const userInexistente = 999;
    try {
      await request(app.getHttpServer()).get(`/users/${userInexistente}`);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`El user con id ${userInexistente} no existe`);
    }
  });

  it('Deberia actualizar un user existente', async () => {
    const nuevoUsuario = await usersRepository.save({
      name: 'User para actualizar',
      email: 'email@gmail.com para actualizar',
      password: 'password para actualizar',
    });
    const nuevaData: UpdateUserDto = {
      name: 'User actualizado',
      email: 'email@gmail.com de user actualizado',
    };

    const respuestaActualizar = await request(app.getHttpServer())
      .put(`/users/${nuevoUsuario.id}`)
      .send(nuevaData);

    expect(respuestaActualizar.status).toBe(200);
    expect(respuestaActualizar.body.name).toEqual(nuevaData.name);
    expect(respuestaActualizar.body.email).toEqual(nuevaData.email);
  });

  it('Debería lanzar un error si se intenta actualizar un usuario con un email que ya existe', async () => {
    const usuarioExistente = await usersRepository.save({
      name: 'Usuario existente',
      email: 'email@gmail.com',
      password: 'passwordExistente',
    });
  
    const usuarioAActualizar = await usersRepository.save({
      name: 'Usuario para actualizar',
      email: 'otroemail@gmail.com',
      password: 'passwordParaActualizar',
    });
  
    const nuevaData: UpdateUserDto = {
      name: 'Usuario actualizado',
      email: 'email@gmail.com', 
    };
  
    const respuestaActualizar = await request(app.getHttpServer())
      .put(`/users/${usuarioAActualizar.id}`)
      .send(nuevaData);
  
    expect(respuestaActualizar.status).toBe(400); 
    expect(respuestaActualizar.body.message).toBe('Email already exists');
  });
  

  it('Debería lanzar NotFoundException al no encontrar un user para modificar', async () => {
    const userInexistente = 999;
    try {
      const nuevaData: UpdateUserDto = {
        name: 'User actualizado',
        email: 'email@gmail.com de user actualizado',
      };
      await request(app.getHttpServer())
        .put(`/users/${userInexistente}`)
        .send(nuevaData);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`La user con id ${userInexistente} no existe`);
    }
  });
  it('Debería eliminar un user existente', async () => {
    const nuevoUsuario = await usersRepository.save({
      name: 'User para eliminar',
      email: 'email@gmail.com de user para eliminar',
      password: 'password de user para eliminar',
    });
    const respuestaEliminar = await request(app.getHttpServer()).delete(
      `/users/${nuevoUsuario.id}`,
    );
    expect(respuestaEliminar.status).toBe(200);
  });
  it('Debería lanzar NotFoundException al no encontrar un user para eliminar', async () => {
    const userInexistente = 999;
    const respuestaEliminar = await request(app.getHttpServer()).delete(
      `/users/${userInexistente}`,
    );
    expect(respuestaEliminar.status).toBe(404);
  });
});
