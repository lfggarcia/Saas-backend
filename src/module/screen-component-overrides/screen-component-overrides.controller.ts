import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScreenComponentOverridesService } from './screen-component-overrides.service';
import { CreateScreenComponentOverrideDto } from './dto/create-screen-component-override.dto';
import { UpdateScreenComponentOverrideDto } from './dto/update-screen-component-override.dto';

@Controller('screen-component-overrides')
export class ScreenComponentOverridesController {
  constructor(private readonly screenComponentOverridesService: ScreenComponentOverridesService) {}

  @Post()
  create(@Body() createScreenComponentOverrideDto: CreateScreenComponentOverrideDto) {
    return this.screenComponentOverridesService.create(createScreenComponentOverrideDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateScreenComponentOverrideDto>) {
    return this.screenComponentOverridesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenComponentOverridesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenComponentOverrideDto: UpdateScreenComponentOverrideDto) {
    return this.screenComponentOverridesService.update(id, updateScreenComponentOverrideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenComponentOverridesService.remove(id);
  }
}
