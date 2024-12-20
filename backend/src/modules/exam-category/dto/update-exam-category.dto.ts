import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateExamCategoryDto } from "./create-exam-category.dto";

export class UpdateExamCategoryDto extends CreateExamCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
