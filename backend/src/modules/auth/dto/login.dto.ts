import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { formatBdMobileNumber } from "../../../config/utils";
import { Transform } from "class-transformer";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone("bn-BD")
  @Transform((params) => formatBdMobileNumber(params.value))
  @ApiProperty({ type: String, default: "8801777112233" })
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, default: "1234" })
  password: string;
}
