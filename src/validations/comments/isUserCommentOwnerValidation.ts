import HttpResponseDto from '../../dtos/httpResponseDto';

const isUserCommentOwnerValidation = ({
  comment,
  userId,
}: any): HttpResponseDto => {
  if (userId !== comment.user.id) {
    return {
      statusCode: 401,
      data: { error: 'O usuário logado não é dono do comentário!' },
    };
  }

  return { statusCode: 200, data: null };
};

export default isUserCommentOwnerValidation;
