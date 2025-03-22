import { FindManyOptions } from 'typeorm';

export const ParseFilters = (filters: Record<string, any>): FindManyOptions<any> => {
  const options: FindManyOptions<any> = {
    where: {},
  };

  for (const [key, value] of Object.entries(filters)) {
    if (!key.toLowerCase().includes("id") && value !== undefined && value !== null) {
      if (!options.where) {
        options.where = {};
      }
      options.where[key] = value;
    }
  }

  return options;
};
