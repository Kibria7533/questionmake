import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateChapterDto } from "./create-chapter.dto";

export class UpdateChapterDto extends CreateChapterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
