import { Paginator } from '@autronas/core/interfaces';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PaginatorDTO implements Paginator {
  @IsNotEmpty({ message: 'REQUIRED' })
  @Type(() => Number)
  @IsNumber(undefined, { message: 'INVALID_NUMBER' })
  @Min(0, { message: 'MIN_0' })
  @ApiProperty({ minimum: 0 })
  declare readonly offset: number;

  @IsNotEmpty({ message: 'REQUIRED' })
  @Type(() => Number)
  @IsNumber(undefined, { message: 'INVALID_NUMBER' })
  @Min(1, { message: 'MIN_1' })
  @Max(50, { message: 'MAX_50' })
  @ApiProperty({ minimum: 0, maximum: 50 })
  declare readonly limit: number;

  @ApiPropertyOptional()
  declare readonly sort?: string;

  @ApiPropertyOptional({ example: 'asc' })
  @Transform(({ value }) => value.toUpperCase())
  declare readonly direction?: 'asc' | 'desc';
}
