import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { StatusesService } from '../services/statuses.service';
import { Status } from '../entities/status.entity';
import { CreateStatusDto } from '../dto/create-status.dto';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/statuses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  findAll(): Promise<Status[]> {
    return this.statusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Status> {
    return this.statusesService.findOne(id);
  }

  @Post()
  create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusesService.create(createStatusDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<Status> {
    return this.statusesService.update(id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.statusesService.remove(id);
  }
}
