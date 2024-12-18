import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateClassDto } from "./create-class.dto";

export class UpdateClassDto extends CreateClassDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
