export default interface HttpResponseDto<T = any> {
  statusCode: number;
  data: T;
}
