import { createLogger, transports, format } from 'winston';
import { TransformableInfo } from 'logform';
import { WinstonReporter, Consola } from 'consola';
import * as cs from 'colors/safe';
import chalk from 'chalk';
import { join } from 'path';
import { platform, homedir } from 'os';
import { readFileSync } from 'fs';
import { LoggerConfig } from '@/interface/config.interface';
const packageValue = JSON.parse(
  readFileSync(join(process.cwd(), './package.json')).toString('utf-8'),
);
/**
 * 配置日志
 */
export default class CustomLogger {
  protected logger: Consola | null = null;
  protected init(config: LoggerConfig | undefined = {}) {
    const { error = {}, combined = {} } = config;
    const isWindow = platform() === 'win32';
    const winstonLogger = createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.printf(createTransform(true)),
        }),
        new transports.File({
          filename: isWindow ? homedir() + error.path : error.path,
          level: 'error',
          maxFiles: error.maxFiles,
          format: format.printf(createTransform()),
        }),

        new transports.File({
          filename: isWindow ? homedir() + combined.path : combined.path,
          maxFiles: combined.maxFiles,
          maxsize: combined.maxSize,
          format: format.printf(createTransform()),
        }),
      ],
    });

    this.logger = new Consola({
      reporters: [new WinstonReporter(winstonLogger)],
    });
  }
}

type templateFunction = (info: TransformableInfo) => string;
/**
 * 创建transform 格式化日志
 */
function createTransform(unColor = false): templateFunction {
  function TransformableInfo(info: TransformableInfo): string {
    const strip = unColor ? (s: string) => s : cs.strip;
    const color = getColorFunc(info.level);
    const pidMsg = chalk.green(`[${packageValue.name}] ${process.pid}`);
    const time = chalk.white(getTimestamp());
    const label = chalk.magenta(`[ ${info.args.join('')} ]`);
    const message = color(info.message);
    const level = color(`[ ${info.level} ]`);
    return `${strip(pidMsg)} --${strip(time)}  ${strip(level)} ${strip(
      label,
    )}: ${strip(message)} `;
  }
  return TransformableInfo;
}
/**
 *  获取时间
 * @returns string
 */
function getTimestamp(): string {
  const localeStringOptions = {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
  };
  return new Intl.DateTimeFormat(
    undefined,
    localeStringOptions as Intl.DateTimeFormatOptions,
  ).format(Date.now());
}

function getColorFunc(level: string): chalk.Chalk {
  const colors: Record<string, chalk.Chalk> = {
    info: chalk.green,
    log: chalk.green,
    warn: chalk.cyan,
    error: chalk.red,
    debug: chalk.yellow,
    verbose: chalk.blue,
  };
  return colors[level] || colors.log;
}
