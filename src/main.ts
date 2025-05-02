import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

	app.useGlobalFilters(new TypeOrmExceptionFilter());
	
	app.enableCors({
		origin: 'http://localhost:5173',
  	credentials: true
	});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
