import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
