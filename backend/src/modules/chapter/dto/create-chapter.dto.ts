import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChapterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
