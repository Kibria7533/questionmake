import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import DatabaseConfig from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { ExamModule } from "./modules/exam/exam.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRE, JWT_SECRET } from "./config/constant";
import { ExamCategoryModule } from "./modules/exam-category/exam-category.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE },
    }),
    AuthModule,
    UserModule,
    ExamCategoryModule,
    ExamModule,
  ],
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
