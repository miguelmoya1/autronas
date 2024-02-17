import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CharacterReviveInput {
  @ApiProperty()
  @IsUUID('4', { message: 'GAME_ID_INVALID_UUID_V4' })
  declare gameID: string;

  @ApiProperty()
  @IsUUID('4', { message: 'CHARACTER_ID_INVALID_UUID_V4' })
  declare characterID?: string;
}
