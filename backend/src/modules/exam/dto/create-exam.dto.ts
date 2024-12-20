import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";
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

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: "Number of questions in the exam" })
  questions: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: "Number of students who passed" })
  passed: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: "Average score (e.g., '95.1%')" })
  score: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: "Description of the exam" })
  description: string;
}
