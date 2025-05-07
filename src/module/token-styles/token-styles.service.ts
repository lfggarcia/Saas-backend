import { Injectable } from '@nestjs/common';
import { CreateTokenStyleDto } from './dto/create-token-style.dto';
import { UpdateTokenStyleDto } from './dto/update-token-style.dto';
import { TokenStyles } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TokenStylesService {
	private baseService: BaseService<TokenStyles>;

	constructor(
		@InjectRepository(TokenStyles)
		private readonly tokenStylesRepository: Repository<TokenStyles>,
	) {
		this.baseService = new BaseService<TokenStyles>(this.tokenStylesRepository);
	}

  create(createTokenStyleDto: CreateTokenStyleDto) {
		const tokenStyle = this.tokenStylesRepository.create(createTokenStyleDto);
		return this.tokenStylesRepository.save(tokenStyle);
  }

  findAll(query: Partial<CreateTokenStyleDto>) {
    const filters = (q: Partial<CreateTokenStyleDto & FindOptionsWhere<TokenStyles>>) => {
			const filter: FindOptionsWhere<TokenStyles> = {};
			if (q.id) filter.id = q.id;
			if (q.styleGroup) filter.styleGroup = q.styleGroup;
			if (q.variantLevel) filter.variantLevel = q.variantLevel;
			return filter;
		}

		return this.baseService.findAll(query, filters);
  }

  findOne(id: string) {
    return this.tokenStylesRepository.findOne({
			where: { id },
		});
  }

  async update(id: string, updateTokenStyleDto: UpdateTokenStyleDto) {
    const tokenStyle = await this.findOne(id);
		if (!tokenStyle) {
			throw new Error(`TokenStyle with id ${id} not found`);
		}
		const updatedTokenStyle = this.tokenStylesRepository.merge(tokenStyle, updateTokenStyleDto);
		return this.tokenStylesRepository.save(updatedTokenStyle);
  }

  async remove(id: string) {
    const tokenStyle = await this.findOne(id);
		if (!tokenStyle) {
			throw new Error(`TokenStyle with id ${id} not found`);
		}
		await this.tokenStylesRepository.remove(tokenStyle);
		return tokenStyle;
  }
}
