import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class GameCode {
  @ApiProperty()
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @IsString({ message: 'CODE_INVALID_STRING' })
  @MinLength(6, { message: 'CODE_MIN_LENGTH' })
  @MaxLength(6, { message: 'CODE_MAX_LENGTH' })
  declare code: string;
}

export class GameAcceptInvite {
  @ApiProperty()
  @IsNotEmpty({ message: 'GAME_ID_REQUIRED' })
  @IsUUID('4', { message: 'GAME_ID_INVALID_UUID' })
  declare gameID: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'USER_ID_REQUIRED' })
  @IsUUID('4', { message: 'USER_ID_INVALID_UUID' })
  declare userID: string;
}

export class GameDeclineInvite {
  @ApiProperty()
  @IsNotEmpty({ message: 'GAME_ID_REQUIRED' })
  @IsUUID('4', { message: 'GAME_ID_INVALID_UUID' })
  declare gameID: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'USER_ID_REQUIRED' })
  @IsUUID('4', { message: 'USER_ID_INVALID_UUID' })
  declare userID: string;
}

export class GameStart {
  @ApiProperty()
  @IsNotEmpty({ message: 'GAME_ID_REQUIRED' })
  @IsUUID('4', { message: 'GAME_ID_INVALID_UUID' })
  declare gameID: string;
}
