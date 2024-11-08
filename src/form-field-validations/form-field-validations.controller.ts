import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { FormFieldValidationsService } from './form-field-validations.service';
import { CreateFormFieldValidationDto } from './dto/create-form-field-validation.dto';
import { UpdateFormFieldValidationDto } from './dto/update-form-field-validation.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('form-field-validations')
@UseGuards(AuthGuard('jwt'))
export class FormFieldValidationsController {
  constructor(private readonly formFieldValidationsService: FormFieldValidationsService) {}

  @Post()
  create(@Body() createFormFieldValidationDto: CreateFormFieldValidationDto, @Request() req) {
    const userId = req.user.id;
    return this.formFieldValidationsService.create(createFormFieldValidationDto, userId);
  }

  @Get('form-field/:formFieldId')
  findAllByFormField(@Param('formFieldId') formFieldId: string, @Request() req) {
    const userId = req.user.id;
    return this.formFieldValidationsService.findAllByFormField(formFieldId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.formFieldValidationsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormFieldValidationDto: UpdateFormFieldValidationDto, @Request() req) {
    const userId = req.user.id;
    return this.formFieldValidationsService.update(id, updateFormFieldValidationDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.formFieldValidationsService.remove(id, userId);
  }
}
