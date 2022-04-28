import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Quote, Risk, RiskRelations} from '../models';
import {QuoteRepository} from './quote.repository';

export class RiskRepository extends DefaultCrudRepository<
  Risk,
  typeof Risk.prototype.riskId,
  RiskRelations
> {
  public readonly quotes: HasManyRepositoryFactory<
    Quote,
    typeof Risk.prototype.riskId
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('QuoteRepository')
    quoteRepositoryGetter: Getter<QuoteRepository>,
  ) {
    super(Risk, dataSource);

    this.quotes = this.createHasManyRepositoryFactoryFor(
      'quotes',
      quoteRepositoryGetter,
    );

    this.registerInclusionResolver('quotes', this.quotes.inclusionResolver);
  }
}
