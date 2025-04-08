// src/common/filters/typeorm-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError & { driverError?: any }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const code = exception?.driverError?.code;

    switch (code) {
      case '23505': { // unique violation
        const detail = exception?.driverError?.detail;
        const matches = /Key \((.*?)\)=\((.*?)\)/.exec(detail);
        const field = matches?.[1] ?? 'field';
        const value = matches?.[2] ?? 'value';
        return response.status(409).json({
          statusCode: 409,
          message: `El valor '${value}' ya está en uso para el campo '${field}'.`,
          error: 'Conflict',
        });
      }

      case '23502': { // not null violation
        const column = exception?.driverError?.column ?? 'unknown';
        return response.status(400).json({
          statusCode: 400,
          message: `El campo '${column}' no puede ser nulo.`,
          error: 'Bad Request',
        });
      }

      case '23503': { // foreign key violation
        return response.status(400).json({
          statusCode: 400,
          message: `Violación de clave foránea. Verifica que las relaciones existan.`,
          error: 'Bad Request',
        });
      }

      default:
        return response.status(500).json({
          statusCode: 500,
          message: 'Ocurrió un error inesperado en la base de datos.',
          error: 'Internal Server Error',
        });
    }
  }
}
