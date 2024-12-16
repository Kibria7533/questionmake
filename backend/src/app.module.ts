import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import DatabaseConfig from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "./middleware/auth.middleware";

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: "auth/(.*)", method: RequestMethod.ALL }, { path: "public/(.*)", method: RequestMethod.ALL })
      .forRoutes("*"); // Apply middleware to all other routes
  }
}
