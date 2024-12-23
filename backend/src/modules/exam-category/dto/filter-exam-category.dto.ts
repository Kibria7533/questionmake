import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsNumeric } from "../../../config/validations/is-number-string.validator";

export class FilterExamCategoryDto {
  @IsOptional()
  @IsNumeric()
  @ApiPropertyOptional({ type: Number })
  is_popular: number;
}
