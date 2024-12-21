import { extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { BadRequestException } from "@nestjs/common";

export const FILE_UPLOAD_PATH = "./assets";
// Multer configuration
export const multerConfig = {
  dest: FILE_UPLOAD_PATH,
};

export const multerOptions = (dest?: string, fileSizeLimit?: number, fileTypes?: string[]): MulterOptions => ({
  dest: dest ?? null,
  limits: {
    fileSize: fileSizeLimit ?? null, // dynamic file size limit
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any): void => {
      const uploadPath = dest ?? multerConfig.dest;
      // Create folder if it doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any): void => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req: any, file: any, cb: any): void => {
    // Apply file size limit and fileTypes based on the route
    if (dest) {
      checkMimeTypeAndSize(req, file, cb, fileSizeLimit, fileTypes);
    } else {
      // Allow all file types
      cb(null, true);
    }
  },
});

const checkMimeTypeAndSize = (req: any, file: any, cb: any, fileSize: number, fileTypes: string[]): any => {
  const fileExtension: string = extname(file.originalname).replace(".", "");
  // If the file exceeds the max file size, reject the file
  if (file.size > fileSize) {
    return cb(new BadRequestException(`File too large. Maximum allowed size is ${fileSize / (1024 * 1024)}MB`), false);
  }

  // Check mimetype for allowed extensions
  if (fileTypes.includes(fileExtension)) {
    cb(null, true); // Allow file
  } else {
    // Reject the file and return an error
    cb(new BadRequestException(`Unsupported file type ${extname(file.originalname)}`), false);
  }
};
