import { PartialType } from '@nestjs/mapped-types';
import { CreateOperLogDto } from './create-oper-log.dto';

export class UpdateOperLogDto extends PartialType(CreateOperLogDto) {}
