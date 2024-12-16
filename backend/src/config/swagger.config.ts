import { DocumentBuilder } from "@nestjs/swagger";
import { BEARER_TOKEN_KEY } from "./constant";

const swaggerConfig = new DocumentBuilder()
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    BEARER_TOKEN_KEY,
  )
  .setTitle("Question Make")
  .setDescription("Question Make")
  .setVersion("1.0")
  .build();

export default swaggerConfig;
