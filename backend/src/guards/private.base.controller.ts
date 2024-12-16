import { UseGuards } from "@nestjs/common";
import { AuthenticationGuard } from "./authentication.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { BEARER_TOKEN_KEY } from "../config/constant";

@UseGuards(AuthenticationGuard)
@ApiBearerAuth(BEARER_TOKEN_KEY)
export class PrivateBaseController {}
