import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterQuestionsDto {
  @ApiPropertyOptional({ description: 'Filter by class name' })
  class?: string;

  @ApiPropertyOptional({ description: 'Filter by subject name' })
  subject?: string;

  @ApiPropertyOptional({ description: 'Filter by exam name' })
  exam?: string;

  @ApiPropertyOptional({ description: 'Filter by chapter name' })
  chapter?: string;

  @ApiPropertyOptional({ description: 'Search by any text across multiple fields' })
  text?: string;
}
