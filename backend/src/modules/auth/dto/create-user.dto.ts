import { IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "../../../config/enum";
import { enumToString, formatBdMobileNumber } from "../../../config/utils";
import { IsNumeric } from "../../../config/validations/is-number-string.validator";
import { Transform } from "class-transformer";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsNumeric()
  @ApiProperty({ type: Number, enum: Gender, description: enumToString(Gender) })
  gender: number;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone("bn-BD")
  @Transform((params) => formatBdMobileNumber(params.value))
  @ApiProperty({ type: String, default: "01700224466" })
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, default: "example@example.com" })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, default: "1234" })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, default: "1234" })
  confirm_password: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  profile_path: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String, default: "2024-12-12" })
  dob: string;
}
