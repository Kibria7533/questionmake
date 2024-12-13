import { DocumentBuilder } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder().setTitle("Question Make").setDescription("Question Make").setVersion("1.0").build();

export default swaggerConfig;
