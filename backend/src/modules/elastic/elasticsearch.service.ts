import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly esService: NestElasticsearchService) {}

  async createIndex(index: string) {
    const exists = await this.esService.indices.exists({ index });
    if (!exists) {
      await this.esService.indices.create({ index });
    }
  }

  async indexDocument(index: string, id: string, body: any) {
    return this.esService.index({
      index,
      id,
      body,
    });
  }

  async search(index: string, query: any) {
    return this.esService.search({
      index,
      body: {
        query,
      },
    });
  }

  async updateDocument(index: string, id: string, body: any) {
    return this.esService.update({
      index,
      id,
      body: {
        doc: body, // Elasticsearch requires partial updates to be specified under "doc"
      },
    });
  }

  async deleteDocument(index: string, id: string) {
    return this.esService.delete({
      index,
      id,
    });
  }
}
