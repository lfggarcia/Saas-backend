import { Repository, FindManyOptions } from 'typeorm';

import { ObjectLiteral } from 'typeorm';

export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: FindManyOptions<T>,
  query: any,
): Promise<{ data: T[]; meta: any }> {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;

  const [data, totalItems] = await repository.findAndCount({
    ...options,
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    meta: {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize: limit,
    },
  };
}