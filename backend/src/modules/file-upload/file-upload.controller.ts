import { Controller, Delete, Get, Inject, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { FILE_UPLOAD_PATH, multerOptions } from "../../config/file-upload.config";
import { PublicBaseController } from "../../guards/public.base.controller";
import { ApiFileUpload } from "../../config/utils";
import { FileUploadService } from "./file-upload.service";

@Controller("file-upload")
export class FileUploadController extends PublicBaseController {
  @Inject()
  private readonly service: FileUploadService;

  @Post("upload")
  @ApiFileUpload("file", true)
  @UseInterceptors(FileInterceptor("file", multerOptions()))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return await this.service.upload(file);
  }

  @Get("/view-file/:fileName")
  async viewFile(@Param("fileName") fileName: string, @Res() res: Response): Promise<void> {
    await this.service.viewFile(fileName, res, FILE_UPLOAD_PATH);
  }

  @Delete(":fileName")
  async removeFile(@Param("fileName") fileName: string): Promise<void> {
    await this.service.removeFile(fileName, FILE_UPLOAD_PATH);
  }
}
