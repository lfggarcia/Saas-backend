import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { CreateFormFieldDto } from './dto/create-form-field.dto';
import { UpdateFormFieldDto } from './dto/update-form-field.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('form-fields')
@UseGuards(AuthGuard('jwt'))
export class FormFieldsController {
  constructor(private readonly formFieldsService: FormFieldsService) {}

  @Post()
  create(@Body() createFormFieldDto: CreateFormFieldDto, @Request() req) {
    const userId = req.user.id;
    return this.formFieldsService.create(createFormFieldDto, userId);
  }

  @Get('screen-component/:screenComponentId')
  findAllByScreenComponent(@Param('screenComponentId') screenComponentId: string, @Request() req) {
    const userId = req.user.id;
    return this.formFieldsService.findAllByScreenComponent(screenComponentId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.formFieldsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormFieldDto: UpdateFormFieldDto, @Request() req) {
    const userId = req.user.id;
    return this.formFieldsService.update(id, updateFormFieldDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.formFieldsService.remove(id, userId);
  }
}
