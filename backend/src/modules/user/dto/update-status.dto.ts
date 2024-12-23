import { IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: "New status of the user", default: true })
  status: boolean;
}
