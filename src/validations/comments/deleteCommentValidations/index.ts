import HttpResponseDto from '../../../dtos/httpResponseDto';
import isUserCommentOwnerValidation from '../isUserCommentOwnerValidation';
import isUserModerator from '../../users/isUserModerator';
import { User } from '../../../models/User';
import { Comment } from '../../../models/Comment';

interface deleteCommentValidationsProps {
  comment: Comment;
  user: User;
}

const deleteCommentValidations = ({
  comment,
  user,
}: deleteCommentValidationsProps): HttpResponseDto => {
  const isUserCommentOwnerValidationResponse = isUserCommentOwnerValidation({
    comment,
    userId: user.id,
  });

  if (
    isUserCommentOwnerValidationResponse.statusCode !== 200 &&
    !isUserModerator({ user })
  ) {
    return isUserCommentOwnerValidationResponse;
  }

  return { statusCode: 200, data: null };
};

export default deleteCommentValidations;
