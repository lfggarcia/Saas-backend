import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Applications } from '../../entities';

@Injectable()
export class ApplicationsService {
	private baseService: BaseService<Applications>;

	constructor(
		@InjectRepository(Applications)
		private readonly applicationRepository: Repository<Applications>,
		private readonly dataSource: DataSource
	) {
		this.baseService = new BaseService<Applications>(this.applicationRepository);
	}

  create(createApplicationDto: CreateApplicationDto) {
		const application = this.applicationRepository.create(createApplicationDto);
		return this.applicationRepository.save(application);
  }

  findAll(query: Partial<CreateApplicationDto>) {
		const filters = (q: Partial<CreateApplicationDto & FindOptionsWhere<Applications>>) => {
			const filter: FindOptionsWhere<Applications> = {};
			if (q.name) filter.name = q.name;
			if (q.id) filter.id = q.id;
			return filter;
		}
		return this.baseService.findAll(query, filters);
  }

  findOne(id: string) {
		return this.applicationRepository.findOne({
			where: { id },
		});
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.findOne(id);
		if (!application) {
			throw new Error(`Application with id ${id} not found`);
		}
		const updatedApplication = this.applicationRepository.merge(application, updateApplicationDto);
		return this.applicationRepository.save(updatedApplication);
  }

  async remove(id: string) {
		const application = await this.findOne(id);
		if (!application) {
			throw new Error(`Application with id ${id} not found`);
		}
		await this.applicationRepository.remove(application);
		return application
  }

	async getTheme(id: string) {
		const application = await this.findOne(id);
		if (!application) {
			throw new Error(`Application with id ${id} not found`);
		}
		const result = await this.dataSource.query(
			`
			WITH app_context AS (
				SELECT $1::uuid AS app_id
			),
			merged_tokens AS (
				SELECT
					COALESCE(at.key, dt.key) AS key,
					COALESCE(at.value, dt.value) AS value,
					COALESCE(at.category_id, dt.category_id) AS category_id
				FROM default_tokens dt
				LEFT JOIN app_tokens at
					ON at.application_id = (SELECT app_id FROM app_context)
					AND at.category_id = dt.category_id
					AND at.key = dt.key
				UNION
				SELECT at.key, at.value, at.category_id
				FROM app_tokens at
				WHERE at.application_id = (SELECT app_id FROM app_context)
					AND NOT EXISTS (
						SELECT 1 FROM default_tokens dt
						WHERE dt.key = at.key AND dt.category_id = at.category_id
					)
			)
			SELECT json_object_agg(tc.name, grouped.tokens) AS tokens
			FROM (
				SELECT
					mt.category_id,
					json_object_agg(mt.key, mt.value) AS tokens
				FROM merged_tokens mt
				GROUP BY mt.category_id
			) AS grouped
			JOIN token_categories tc ON grouped.category_id = tc.id;
			`,
			[id] // $1 = app_id
		);
		return result?.[0]?.tokens ?? {};
	}
}
