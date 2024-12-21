import { BadRequestException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Response } from "express";
import * as fs from "fs";
import * as mime from "mime";
import { DataSource } from "typeorm";
import { FILE_UPLOAD_PATH } from "../../config/file-upload.config";

@Injectable()
export class FileUploadService {
  @Inject()
  private readonly dataSource: DataSource;

  // async createTempUploadFile(fileName: string, fileExtension: string, moduleName: string): Promise<TempUploadFileEntity> {
  //   const isTempUploadFileExists: TempUploadFileEntity = await this.dataSource.manager.findOne(TempUploadFileEntity, {
  //     where: { file_name: Like(`%${fileName}%`) },
  //   });
  //
  //   if (!isTempUploadFileExists) {
  //     const tempFileUpload: TempUploadFileEntity = new TempUploadFileEntity();
  //
  //     tempFileUpload.module_name = moduleName;
  //     tempFileUpload.file_name = fileName;
  //     tempFileUpload.mime_type = fileExtension;
  //
  //     const tempFileUploadEntity: TempUploadFileEntity = this.dataSource.manager.create(TempUploadFileEntity, tempFileUpload);
  //     return await this.dataSource.manager.save(TempUploadFileEntity, tempFileUploadEntity);
  //   } else {
  //     return null;
  //   }
  // }

  async upload(file: Express.Multer.File): Promise<any> {
    if (file.destination == FILE_UPLOAD_PATH) {
      return file.filename;
    }

    const filename: string = file.filename;
    // const fileExtension: string = extname(file.originalname).replace(".", "");

    try {
      // const tempUploadFile: TempUploadFileEntity = await this.createTempUploadFile(filename, fileExtension, moduleName);

      // if (!tempUploadFile) {
      //   await this.removeFile(filename, fileUploadPath);
      //   throw new Error("Failed to save file information in the database.");
      // }
      return filename;
    } catch (error) {
      throw new BadRequestException(`File upload failed: ${error.message}`);
    }
  }

  async viewFile(fileName: string, res: Response, fileUploadPath: string): Promise<void> {
    const path: string = `${fileUploadPath}/${fileName}`;
    const stat: fs.Stats = await fs.promises.stat(path);

    const mimeType: string = mime.getType(path);

    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Length": stat.size,
    });

    const stream = fs
      .createReadStream(path)
      .on("open", () => stream.pipe(res))
      .on("error", () => res.status(HttpStatus.INTERNAL_SERVER_ERROR).end());
  }

  async removeFile(fileName: string, fileUploadPath: string): Promise<void> {
    const path = `${fileUploadPath}/${fileName}`;

    try {
      // Check Existence
      await fs.promises.stat(path);

      // Remove File
      fs.unlink(path, (err) => {
        if (err) {
          return "Could Not Delete File";
        }
        return "File Deleted successfully";
      });
    } catch (error) {
      console.log(error);
      if (error.code === "ENOENT") {
        throw new BadRequestException("File not found");
      } else {
        throw error;
      }
    }
  }
}
