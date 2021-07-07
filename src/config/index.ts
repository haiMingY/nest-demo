import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

// 加载配置文件
export default () => {
  const env = process.env.NODE_ENV?.trim();
  const YAML_CONFIG_FILE = `config-${env}.yaml`;
  const result = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILE), 'utf-8'),
  ) as Record<string, unknown>;
  return result;
};
