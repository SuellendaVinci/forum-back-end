import UsersRepository from '../repositories/usersRepository';
import jwt from 'jsonwebtoken';

const verifyUser = async token => {
  try {
    const jwtData = jwt.verify(token, 'forum');

    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({ where: { id: jwtData?.id } });

    if (!user?.id) {
      throw 'Token inválido';
    }

    return { statusCode: 200, data: { userId: user.id } };
  } catch (error) {
    return { statusCode: 401, data: { error: 'Token inválido!' } };
  }
};

export default verifyUser;
