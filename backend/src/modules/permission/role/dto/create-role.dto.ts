import { IsNotEmpty, IsString ,IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number })
    roleID: number; // Added roleID property
}
