import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class VoteCreate {
  @ApiProperty()
  @IsUUID('4', { message: 'GAME_ID_INVALID_UUID_V4' })
  declare gameID: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4', { message: 'CHARACTER_ID_INVALID_UUID_V4' })
  declare characterID?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'VOTE_IS_SKIPPED_INVALID_BOOLEAN' })
  declare isSkipped?: boolean;
}
