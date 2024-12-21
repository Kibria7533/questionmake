import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PickType(CreateUserDto, ["name", "mobile", "email", "dob", "profile_path"]) {}
