import { ApiProperty } from '@nestjs/swagger';
import { GoogleLogin } from '@sleep-valley/core/interfaces';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GoogleLoginEntity implements GoogleLogin {
  @ApiProperty()
  @IsNotEmpty({ message: 'ID_REQUIRED' })
  declare id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'EMAIL_REQUIRED' })
  @IsString({ message: 'EMAIL_INVALID_STRING' })
  @IsEmail({}, { message: 'EMAIL_INVALID_EMAIL' })
  declare email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'GIVEN_NAME_REQUIRED' })
  @IsString({ message: 'GIVEN_NAME_INVALID_STRING' })
  declare givenName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'FAMILY_NAME_REQUIRED' })
  @IsString({ message: 'FAMILY_NAME_INVALID_STRING' })
  declare familyName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'IMAGE_URL_REQUIRED' })
  @IsString({ message: 'IMAGE_URL_INVALID_STRING' })
  @IsUrl({}, { message: 'IMAGE_URL_INVALID_URL' })
  declare imageUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ACCESS_TOKEN_REQUIRED' })
  @IsString({ message: 'ACCESS_TOKEN_INVALID_STRING' })
  declare accessToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ID_TOKEN_REQUIRED' })
  @IsString({ message: 'ID_TOKEN_INVALID_STRING' })
  declare idToken: string;
}
