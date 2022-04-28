import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Quote} from '../models';
import {QuoteRepository} from '../repositories';

export class QuoteController {
  constructor(
    @repository(QuoteRepository)
    public quoteRepository : QuoteRepository,
  ) {}

  @post('/quotes')
  @response(200, {
    description: 'Quote model instance',
    content: {'application/json': {schema: getModelSchemaRef(Quote)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quote, {
            title: 'NewQuote',
            exclude: ['quoteId'],
          }),
        },
      },
    })
    quote: Omit<Quote, 'quoteId'>,
  ): Promise<Quote> {
    return this.quoteRepository.create(quote);
  }

  @get('/quotes/count')
  @response(200, {
    description: 'Quote model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Quote) where?: Where<Quote>,
  ): Promise<Count> {
    return this.quoteRepository.count(where);
  }

  @get('/quotes')
  @response(200, {
    description: 'Array of Quote model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Quote, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Quote) filter?: Filter<Quote>,
  ): Promise<Quote[]> {
    return this.quoteRepository.find(filter);
  }

  @patch('/quotes')
  @response(200, {
    description: 'Quote PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quote, {partial: true}),
        },
      },
    })
    quote: Quote,
    @param.where(Quote) where?: Where<Quote>,
  ): Promise<Count> {
    return this.quoteRepository.updateAll(quote, where);
  }

  @get('/quotes/{id}')
  @response(200, {
    description: 'Quote model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Quote, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Quote, {exclude: 'where'}) filter?: FilterExcludingWhere<Quote>
  ): Promise<Quote> {
    return this.quoteRepository.findById(id, filter);
  }

  @patch('/quotes/{id}')
  @response(204, {
    description: 'Quote PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quote, {partial: true}),
        },
      },
    })
    quote: Quote,
  ): Promise<void> {
    await this.quoteRepository.updateById(id, quote);
  }

  @put('/quotes/{id}')
  @response(204, {
    description: 'Quote PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() quote: Quote,
  ): Promise<void> {
    await this.quoteRepository.replaceById(id, quote);
  }

  @del('/quotes/{id}')
  @response(204, {
    description: 'Quote DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.quoteRepository.deleteById(id);
  }
}
