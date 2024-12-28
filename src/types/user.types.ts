export class CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UserDTO {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
