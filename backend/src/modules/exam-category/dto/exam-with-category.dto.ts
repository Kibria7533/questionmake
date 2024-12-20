import { ApiProperty } from "@nestjs/swagger";

export class ExamDto {
  @ApiProperty({ type: Number, description: "ID of the exam" })
  id: number;

  @ApiProperty({ type: String, description: "Name of the exam" })
  name: string;
}

export class ExamCategoryWithExamsDto {
  @ApiProperty({ type: Number, description: "ID of the exam category" })
  id: number;

  @ApiProperty({ type: String, description: "Name of the exam category" })
  name: string;

  @ApiProperty({ type: [ExamDto], description: "List of exams in this category" })
  exams: ExamDto[];
}
