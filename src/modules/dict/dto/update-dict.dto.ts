import { PartialType } from '@nestjs/mapped-types';
import { CreateDictDto } from './create-dict.dto';

export class UpdateDictDto extends PartialType(CreateDictDto) {}
