import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DictDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  page: number;
}

