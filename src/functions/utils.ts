import { Visibility } from './types';

// 类型保护函数
export function isVisibility(value: any): value is Visibility {
  return ['public', 'unlisted', 'private', 'direct'].includes(value);
}
