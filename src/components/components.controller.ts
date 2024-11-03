import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('components')
@UseGuards(AuthGuard('jwt'))
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  create(@Body() createComponentDto: CreateComponentDto, @Request() req) {
    const userId = req.user.id;
    return this.componentsService.create(createComponentDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.componentsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.componentsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.componentsService.update(id, updateComponentDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.componentsService.remove(id, userId);
  }
}
