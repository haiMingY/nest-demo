import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';
import { AppModule } from './module/app.module';
import { CustomLoggerService } from './service/logger.service';

/**
 * 项目启动入口
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/apis');
  app.enableCors();
  // 自定义logger
  app.useLogger(await app.resolve<CustomLoggerService>(CustomLoggerService));
  // 全局错误过滤器
  app.useGlobalFilters(new AllExceptionFilter());

  const config = await app.resolve<ConfigService>(ConfigService);
  const { port } = config.get('server');
  await app.listen(port);
}
bootstrap();
