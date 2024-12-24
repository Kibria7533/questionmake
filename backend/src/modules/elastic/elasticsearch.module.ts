import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200', // Replace with your Elasticsearch URL
      auth: {
        username: 'elastic', // Replace with your credentials
        password: 'password', // Replace with your credentials
      },
    }),
  ],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticSearchModule {}
