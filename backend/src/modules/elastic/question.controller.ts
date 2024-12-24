import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { FilterQuestionsDto } from './dto/filter-questions.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Post()
  async addQuestion(@Body() body: any) {
    const index = 'questions';
    await this.elasticsearchService.createIndex(index);
    const response = await this.elasticsearchService.indexDocument(
      index,
      body.id || new Date().toISOString(),
      body,
    );
    return response;
  }
  @Get('filter')
  async filterQuestions(@Query() query: FilterQuestionsDto) {
    const { class: className, subject, exam, chapter, text } = query;
    const index = 'questions';
    const must = [];

    if (className) {
      must.push({ match: { classes: className } });
    }
    if (subject) {
      must.push({ match: { subjects: subject } });
    }
    if (exam) {
      must.push({ match: { exams: exam } });
    }
    if (chapter) {
      must.push({ match: { chapters: chapter } });
    }
    if (text) {
      must.push({
        multi_match: {
          query: text,
          fields: ['questionText', 'description', 'type'],
        },
      });
    }

    const queryBody = must.length ? { bool: { must } } : { match_all: {} };
    const response = await this.elasticsearchService.search(index, queryBody);
    return response.hits.hits.map((hit) => hit._source);
  }
  
  @Get()
  async searchQuestions(@Query('query') query: string) {
    const index = 'questions';
    const response = await this.elasticsearchService.search(index, {
      match: { questionText: query },
    });
    return response.hits.hits.map((hit) => hit._source);
  }
}
