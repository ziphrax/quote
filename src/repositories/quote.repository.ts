import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Quote, QuoteRelations, Risk} from '../models';
import {RiskRepository} from './risk.repository';

export class QuoteRepository extends DefaultCrudRepository<
  Quote,
  typeof Quote.prototype.riskId,
  QuoteRelations
> {
  public readonly risk: BelongsToAccessor<Risk, typeof Quote.prototype.riskId>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('RiskRepository')
    protected riskRepositoryGetter: Getter<RiskRepository>,
  ) {
    super(Quote, dataSource);

    this.risk = this.createBelongsToAccessorFor('risk', riskRepositoryGetter);

    this.registerInclusionResolver('risk', this.risk.inclusionResolver);
  }
}
