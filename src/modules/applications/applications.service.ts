import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applications, Users } from '../../entities';
import { paginate } from 'src/commons/decorators/paginate.decorator';

@Injectable()
export class ApplicationsService {
	constructor(
		@InjectRepository(Applications)
		private applicationsRepository: Repository<Applications>,
		@InjectRepository(Users)
		private usersRepository: Repository<Users>,
	) {}

	async findAll(userID: string, query:any) {
		return paginate(this.applicationsRepository,{ where: { user: {id:userID} } },query);
	}

	async findOne(id: string, userID: string) {
		const applications = await this.applicationsRepository.findOne({
			where: { 
				id, 
				user: {
					id: userID,
				}
			},
		});

		if (!applications) {
			throw new NotFoundException('Application not found');
		}
		return applications;
	}

	async update(id: string, userID: string, data: Partial<Applications>) {
		const applications = await this.applicationsRepository.findOne({
			where: { 
				id, 
				user: {
					id: userID,
				}
			},
		});

		if (!applications) {
			throw new NotFoundException('Application not found');
		}

		await this.applicationsRepository.update(id, data);
		return this.applicationsRepository.findOne({where: {id}});
	}

	async remove(id: string, userID: string) {
		const applications = await this.applicationsRepository.findOne({
			where: { 
				id, 
				user: {
					id: userID,
				}
			},
		});

		if (!applications) {
			throw new NotFoundException('Application not found');
		}

		await this.applicationsRepository.delete(id);
		return applications;
	}

	async create(userID: string, data: Partial<Applications>) {
		const {applications,plan} = await this.usersRepository.findOne({
			where: { id: userID },
			relations: ['applications', "plan"],
		})
		const maxApplications = plan.max_apps;
		const currentApplications = applications.length;
		if (currentApplications >= maxApplications) {
			throw new ConflictException(`You have reached the maximum number of applications allowed for your plan (${maxApplications})`);
		}
		const application = this.applicationsRepository.create({
			...data,
			user: {
				id: userID,
			},
		});
		await this.applicationsRepository.save(application);
		return application;
	}
}
