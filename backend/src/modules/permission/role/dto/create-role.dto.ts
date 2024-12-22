import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumeric } from "../../../../config/validations/is-number-string.validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsNumeric()
  @ApiProperty({ type: Number })
  role_id: number; // Added roleID property
}
