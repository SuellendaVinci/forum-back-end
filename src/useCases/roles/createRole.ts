import { Repository } from 'typeorm';
import { Role } from '../../models/Role';
import RolesRepository from '../../repositories/rolesRepository';
import RoleDto from '../../dtos/roleDto';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class CreateRoleUseCase {
  private _repository: Repository<Role>;

  constructor() {
    this._repository = RolesRepository;
  }

  public async execute({
    name,
  }: Omit<RoleDto, 'id'>): Promise<HttpResponseDto | null> {
    const role = new Role();
    role.name = name;

    const response = await this._repository
      .save(role)
      .then((): HttpResponseDto<Role> => {
        return { statusCode: 201, data: role };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}
