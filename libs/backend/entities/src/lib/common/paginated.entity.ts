import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function Paginated<T>(classRef: Type<T>) {
  abstract class PaginatedType {
    @ApiProperty()
    public declare count: number;

    @ApiProperty()
    public declare hasNext: boolean;

    @ApiProperty()
    public declare hasPrevious: boolean;

    @ApiProperty({ type: [classRef] })
    public declare data: T[];
  }

  return PaginatedType;
}
