import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumeric } from "../../../config/validations/is-number-string.validator";

export class FilterUserDto {
  @IsOptional()
  @IsNumeric()
  @ApiProperty({ type: Number })
  role: number;
}
