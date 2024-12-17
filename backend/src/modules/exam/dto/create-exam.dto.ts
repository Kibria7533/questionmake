import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumeric } from "../../../config/validations/is-number-string.validator";

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsNumeric()
  @ApiProperty({ type: Number })
  exam_category_id: number;
}
