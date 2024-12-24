import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FilterQuestionsDto {

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  class?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  subject?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  exam?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  chapter?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  type?: string;
  
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  text?: string;
}
