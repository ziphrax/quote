import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Risk} from '../models';
import {RiskRepository} from '../repositories';

export class RiskController {
  constructor(
    @repository(RiskRepository)
    public riskRepository: RiskRepository,
  ) {}

  @post('/risks')
  @response(200, {
    description: 'Risk model instance',
    content: {'application/json': {schema: getModelSchemaRef(Risk)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Risk, {
            title: 'NewRisk',
            exclude: ['riskId'],
          }),
        },
      },
    })
    risk: Omit<Risk, 'riskId'>,
  ): Promise<Risk> {
    return this.riskRepository.create(risk);
  }

  @get('/risks/count')
  @response(200, {
    description: 'Risk model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Risk) where?: Where<Risk>): Promise<Count> {
    return this.riskRepository.count(where);
  }

  @get('/risks')
  @response(200, {
    description: 'Array of Risk model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Risk, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Risk))
    filter?: Filter<Risk>,
  ): Promise<Risk[]> {
    return this.riskRepository.find(filter);
  }

  @patch('/risks')
  @response(200, {
    description: 'Risk PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Risk, {partial: true}),
        },
      },
    })
    risk: Risk,
    @param.where(Risk) where?: Where<Risk>,
  ): Promise<Count> {
    return this.riskRepository.updateAll(risk, where);
  }

  @get('/risks/{id}')
  @response(200, {
    description: 'Risk model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Risk, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Risk, {exclude: 'where'}) filter?: FilterExcludingWhere<Risk>,
  ): Promise<Risk> {
    return this.riskRepository.findById(id, filter);
  }

  @patch('/risks/{id}')
  @response(204, {
    description: 'Risk PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Risk, {partial: true}),
        },
      },
    })
    risk: Risk,
  ): Promise<void> {
    await this.riskRepository.updateById(id, risk);
  }

  @put('/risks/{id}')
  @response(204, {
    description: 'Risk PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() risk: Risk,
  ): Promise<void> {
    await this.riskRepository.replaceById(id, risk);
  }

  @del('/risks/{id}')
  @response(204, {
    description: 'Risk DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.riskRepository.deleteById(id);
  }
}
