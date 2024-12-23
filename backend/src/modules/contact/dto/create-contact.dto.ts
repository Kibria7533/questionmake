import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  subject: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  body: string;
}
