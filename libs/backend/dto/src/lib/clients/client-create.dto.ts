import { ClientCreateInput } from '@autronas/core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

export class ClientCreateDTO implements ClientCreateInput {
  @ApiProperty()
  @IsNotEmpty({ message: 'CLIENT_NAME_REQUIRED' })
  @IsString({ message: 'CLIENT_NAME_INVALID_STRING' })
  declare name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CLIENT_EMAIL_REQUIRED' })
  @IsEmail({}, { message: 'CLIENT_EMAIL_INVALID_EMAIL' })
  declare email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CLIENT_PERSONAL_ID_REQUIRED' })
  @IsString({ message: 'CLIENT_PERSONAL_ID_INVALID_STRING' })
  declare personalID: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CLIENT_IS_BUSINESS_REQUIRED' })
  @IsBoolean({ message: 'CLIENT_IS_BUSINESS_INVALID_BOOLEAN' })
  declare isBusiness: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'CLIENT_PHONE_NUMBER_INVALID_STRING' })
  @Matches(/^[a-z0-9]+$/i, { message: 'CLIENT_PHONE_NUMBER_INVALID_FORMAT' })
  declare phoneNumber?: string | undefined;

  @ApiProperty()
  @ValidateIf((o) => o.isBusiness)
  @IsNotEmpty({ message: 'CLIENT_SURNAME_REQUIRED' })
  @IsString({ message: 'CLIENT_SURNAME_INVALID_STRING' })
  declare surname?: string;

  @Exclude()
  declare userID?: string;
}
