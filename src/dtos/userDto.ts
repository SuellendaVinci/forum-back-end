export default interface UserDto {
  id: string | number;
  name: string;
  email: string;
  password: string;
  passwordConfirmation:string;
  gender: string;
  ocupation: string;
  city: string;
  roleId: number;
}
