import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import swaggerConfig from "./config/swagger.config";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*" });

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      // exceptionFactory: validationErrorHandling,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "QUESTION MAKE",
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().then(() => console.log("Server running on port: 4000"));
