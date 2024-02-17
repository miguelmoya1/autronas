import { LoginResponse } from '@autronas/core/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AuthResponseEntity implements LoginResponse {
  @ApiProperty()
  declare token: string;
}
