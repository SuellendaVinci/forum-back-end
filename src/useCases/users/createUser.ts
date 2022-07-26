import { Repository } from 'typeorm';
import { User } from './../../models/User';
import { Role } from '../../models/Role';
import UsersRepository from '../../repositories/usersRepository';
import RolesRepository from '../../repositories/rolesRepository';
import UserDto from '../../dtos/userDto';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class CreateUserUseCase {
  private _usersRepository: Repository<User>;
  private _rolesRepository: Repository<Role>;

  constructor() {
    this._usersRepository = UsersRepository;
    this._rolesRepository = RolesRepository;
  }

  public async execute({
    name,
    email,
    password,
    passwordConfirmation,
    gender = null,
    ocupation = null,
    city = null,
    roleId,
  }: Omit<UserDto, 'id'>): Promise<HttpResponseDto | null> {
    if (passwordConfirmation !== password) {
      return {
        statusCode: 400,
        data: { error: 'A confirmação do password está incorreta' },
      };
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.gender = gender;
    user.ocupation = ocupation;
    user.city = city;

    const role = await this._rolesRepository.findOne({
      where: { id: roleId },
    });

    user.role = role;

    const response = await this._usersRepository
      .save(user)
      .then((): HttpResponseDto<User> => {
        return { statusCode: 201, data: user };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}
