import { Repository } from 'typeorm';
import { User } from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';
import UserDto from '../../dtos/userDto';
import jwt from 'jsonwebtoken';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class LoginUseCase {
  private _usersRepository: Repository<User>;

  constructor() {
    this._usersRepository = UsersRepository;
  }

  public async execute({
    email,
    password,
  }: Pick<UserDto, 'email' | 'password'>): Promise<HttpResponseDto | null> {
    const user = await this._usersRepository.findOne({
      where: { email, password },
    });

    if (!user?.id) {
      return {
        statusCode: 404,
        data: { error: 'Usuário ou senha incorretos' },
      };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWTSECRET || 'forum', {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return { statusCode: 201, data: { ...user, access_token: token } };
  }
}
