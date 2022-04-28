import {Entity, hasMany, model, property} from '@loopback/repository';
import {Quote, QuoteWithRelations} from './quote.model';

@model()
export class Risk extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  riskId?: string;

  @property({
    type: 'string',
    required: true,
  })
  proposer: string;

  @property({
    type: 'number',
    required: true,
  })
  numberOfDoors: number;

  @property({
    type: 'number',
    required: true,
  })
  engineSize: number;

  @property({
    type: 'string',
    required: true,
  })
  registration: string;

  @property({
    type: 'string',
    required: true,
  })
  postcode: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleUseType: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleStorageType: string;

  @hasMany<Quote>(() => Quote, {keyTo: 'riskId'})
  quotes?: Quote[];

  constructor(data?: Partial<Risk>) {
    super(data);
  }
}

export interface RiskRelations {
  quotes?: QuoteWithRelations[];
}

export type RiskWithRelations = Risk & RiskRelations;
