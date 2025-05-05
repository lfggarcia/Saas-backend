import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ObjectLiteral, FindManyOptions, FindOptionsRelations } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
	constructor(
		private readonly repository: Repository<T>,
		private readonly responseDto?: new (entity: T) => any,
	) {}

	private transformResponse(data: T[] = []): any[] {
		if (!this.responseDto) return data;
	
		const DtoClass = this.responseDto;
		return data.map((item) => plainToInstance(DtoClass, item, { excludeExtraneousValues: true }));
	}

  async findAll(
    query: any,
    buildFilters?: (query: any) => FindOptionsWhere<T>,
    relations: FindOptionsRelations<T> = {},
  ): Promise<any> {
    const filters = buildFilters ? buildFilters(query) : {};

    if (!query.page && !query.limit) {
      const data = await this.repository.find({ where: filters });
      return this.transformResponse(data);
    }

    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where: filters,
			relations,
      skip,
      take: limit,
    });

    return {
      data: data,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        itemsPerPage: limit,
      },
    };
  }
}
