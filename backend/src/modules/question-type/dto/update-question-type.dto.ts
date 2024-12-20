import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateQuestionTypeDto } from "./create-question-type.dto";

export class UpdateQuestionTypeDto extends CreateQuestionTypeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
