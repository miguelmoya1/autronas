import { ApiProperty } from '@nestjs/swagger';
import { LoginResponse } from '@sleep-valley/core/interfaces';

export abstract class AuthResponseEntity implements LoginResponse {
  @ApiProperty()
  declare token: string;
}
