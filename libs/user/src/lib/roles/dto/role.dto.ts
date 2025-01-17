import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StringUtils } from '@rumsan/core';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Manager',
  })
  @ValidateIf((o, v) => StringUtils.isValidString(v))
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: false,
  })
  @IsOptional()
  isSystem?: boolean;
}

export class EditRoleDto extends PartialType(CreateRoleDto) {}

export class CreatePermissionDto {
  @ApiProperty({
    example: 'Create',
  })
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    example: 'user',
  })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: 2,
  })
  @IsNotEmpty()
  roleId: number;
}

export class UpdatePermissionDto {
  @ApiProperty({
    example: 'Read',
  })
  @IsOptional()
  @IsString()
  action: string;

  @ApiProperty({
    example: 'user',
  })
  @IsOptional()
  @IsString()
  subject: string;

  @ApiProperty({
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  roleId: number;
}
