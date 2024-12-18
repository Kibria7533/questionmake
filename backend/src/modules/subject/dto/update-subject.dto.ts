import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateSubjectDto } from "./create-subject.dto";

export class UpdateSubjectDto extends CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
