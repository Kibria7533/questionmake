import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
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
    const { class: className, subject, exam, chapter, type, text } = query;
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
    if (type) {
      must.push({ match: { type: type } });
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
      // Map `_id` into the response objects
      return response.hits.hits.map((hit) => ({
        id: hit._id, // Add the id field
        ...(hit._source as any), // Cast _source as any to allow spreading
      }));
  }

  @Get()
  async searchQuestions(@Query('query') query: string) {
    const index = 'questions';
    const response = await this.elasticsearchService.search(index, {
      match: { questionText: query },
    });
      // Map `_id` into the response objects
      return response.hits.hits.map((hit) => ({
        id: hit._id, // Add the id field
        ...(hit._source as any), // Cast _source as any to allow spreading
      }));
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() body: any) {
    const index = 'questions';
    const response = await this.elasticsearchService.updateDocument(index, id, body);
    return response;
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    const index = 'questions';
    const response = await this.elasticsearchService.deleteDocument(index, id);
    return response;
  }
}
