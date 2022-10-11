import { PartialType } from '@nestjs/mapped-types';
import { CreateDictTypeDto } from './create-dict-type.dto';

export class UpdateDictTypeDto extends PartialType(CreateDictTypeDto) {}
