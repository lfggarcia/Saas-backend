import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(
    query: any,
    buildFilters?: (query: any) => FindOptionsWhere<T>,
  ): Promise<any> {
    const filters = buildFilters ? buildFilters(query) : {};

    if (!query.page && !query.limit) {
      const data = await this.repository.find({ where: filters });
      return { data };
    }

    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where: filters,
      skip,
      take: limit,
    });

    return {
      data,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        itemsPerPage: limit,
      },
    };
  }
}
