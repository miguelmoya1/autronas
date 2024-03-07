import { ClientUpdateInput } from '@autronas/core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClientUpdateDTO implements ClientUpdateInput {
  @ApiProperty()
  @IsNotEmpty({ message: 'CLIENT_NAME_REQUIRED' })
  @IsString({ message: 'CLIENT_NAME_INVALID_STRING' })
  declare name: string;

  @Exclude()
  declare userID?: string;
}
