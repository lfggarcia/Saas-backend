import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';

@Controller('user-tokens')
export class UserTokensController {
  constructor(private readonly userTokensService: UserTokensService) {}

  @Post()
  create(@Body() createUserTokenDto: CreateUserTokenDto) {
    return this.userTokensService.create(createUserTokenDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserTokenDto>) {
    return this.userTokensService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTokensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTokenDto: UpdateUserTokenDto) {
    return this.userTokensService.update(id, updateUserTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTokensService.remove(id);
  }
}
