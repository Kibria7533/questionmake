import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../config/enum";
import { enumToString } from "../../../config/utils";
import { IsNumeric } from "../../../config/validations/is-number-string.validator";

export class ChangeRoleDto {
  @IsNotEmpty()
  @IsNumeric()
  @ApiProperty({ type: String })
  user_id: number;

  @IsNotEmpty()
  @IsNumeric()
  @ApiProperty({ type: Number, enum: Role, description: enumToString(Role) })
  role: number;
}
