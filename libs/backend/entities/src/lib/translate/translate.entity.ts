import { ApiProperty } from '@nestjs/swagger';

export class TranslateEntity {
  @ApiProperty()
  declare ACCEPT: string;

  @ApiProperty()
  declare ACCESS_TOKEN_INVALID_STRING: string;

  @ApiProperty()
  declare ACCESS_TOKEN_REQUIRED: string;

  @ApiProperty()
  declare DECLINE: string;

  @ApiProperty()
  declare EMAIL_INVALID_EMAIL: string;

  @ApiProperty()
  declare EMAIL_INVALID_STRING: string;

  @ApiProperty()
  declare EMAIL_REQUIRED: string;

  @ApiProperty()
  declare FAMILY_NAME_INVALID_STRING: string;

  @ApiProperty()
  declare FAMILY_NAME_REQUIRED: string;

  @ApiProperty()
  declare GAME_STATUS_FINISHED: string;

  @ApiProperty()
  declare GAME_STATUS_PREPARING: string;

  @ApiProperty()
  declare GAME_STATUS_UNKNOWN: string;

  @ApiProperty()
  declare GIVEN_NAME_INVALID_STRING: string;

  @ApiProperty()
  declare GIVEN_NAME_REQUIRED: string;

  @ApiProperty()
  declare ID_REQUIRED: string;

  @ApiProperty()
  declare ID_TOKEN_INVALID_STRING: string;

  @ApiProperty()
  declare ID_TOKEN_REQUIRED: string;

  @ApiProperty()
  declare IMAGE_URL_INVALID_STRING: string;

  @ApiProperty()
  declare IMAGE_URL_INVALID_URL: string;

  @ApiProperty()
  declare IMAGE_URL_REQUIRED: string;

  @ApiProperty()
  declare INVALID_GAME_ID: string;

  @ApiProperty()
  declare INVALID_TOKEN: string;

  @ApiProperty()
  declare INVALID_USER: string;

  @ApiProperty()
  declare UNAUTHORIZED: string;

  @ApiProperty()
  declare VOTES: string;

  @ApiProperty()
  declare WEREWOLF: string;
}
