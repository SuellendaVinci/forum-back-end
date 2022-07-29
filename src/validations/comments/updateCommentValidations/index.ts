import HttpResponseDto from '../../../dtos/httpResponseDto';
import isUserCommentOwnerValidation from '../isUserCommentOwnerValidation';

const updateCommentValidations = ({
  comment,
  userId,
}: any): HttpResponseDto => {
  const isUserCommentOwnerValidationResponse = isUserCommentOwnerValidation({
    comment,
    userId,
  });

  if (isUserCommentOwnerValidationResponse.statusCode !== 200) {
    return isUserCommentOwnerValidationResponse;
  }

  return { statusCode: 200, data: null };
};

export default updateCommentValidations;
