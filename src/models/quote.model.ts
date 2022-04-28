import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Risk, RiskWithRelations} from './risk.model';

@model()
export class Quote extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  quoteId?: string;

  @belongsTo(() => Risk, {keyTo: 'quoteId'})
  riskId: string;

  @property({
    type: 'number',
    required: true,
  })
  premium: number;

  @property({
    type: 'date',
    required: true,
  })
  quoteDate: string;

  @property({
    type: 'date',
    required: true,
  })
  effectiveDate: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  constructor(data?: Partial<Quote>) {
    super(data);
  }
}

export interface QuoteRelations {
  risk?: RiskWithRelations;
}

export type QuoteWithRelations = Quote & QuoteRelations;
