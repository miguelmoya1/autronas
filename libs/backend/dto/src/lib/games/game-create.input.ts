import { ApiProperty } from '@nestjs/swagger';
import { GameCreate } from '@sleep-valley/core/interfaces';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GameCreateInput implements GameCreate {
  @ApiProperty()
  @IsNotEmpty({ message: 'NAME_REQUIRED' })
  @IsString({ message: 'NAME_INVALID_STRING' })
  declare name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'WITH_WITCH_REQUIRED' })
  @IsBoolean({ message: 'WITH_WITCH_INVALID_BOOLEAN' })
  declare withWitch: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'WITH_SEER_REQUIRED' })
  @IsBoolean({ message: 'WITH_SEER_INVALID_BOOLEAN' })
  declare withSeer: boolean;
}
