import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumeric } from "../../../config/validations/is-number-string.validator";

export class CreateExamCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  description: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  feedback: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  logo_path: string;

  @IsOptional()
  @IsNumeric()
  @ApiPropertyOptional({ type: Number })
  is_popular: number;
}
