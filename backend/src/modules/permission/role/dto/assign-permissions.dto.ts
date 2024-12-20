import { IsArray, IsNotEmpty } from "class-validator";
import { IsNumeric } from "../../../../config/validations/is-number-string.validator";
import { ApiProperty } from "@nestjs/swagger";

export class AssignPermissionsDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumeric({ each: true })
  @ApiProperty({ type: Number, isArray: true, default: [1, 2] })
  permission_ids: number[];
}
