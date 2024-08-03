

// 定义 Visibility 类型
export type Visibility = 'public' | 'unlisted' | 'private' | 'direct';

export interface Status {
  id: number; // 对应 Go 中的 int64，TypeScript 使用 number
  username: string;
  warning: string;
  content: string;
  visibility: Visibility; // 使用之前定义的 Visibility 类型
  createdAt: string; // ISO 8601 日期字符串
  updatedAt: string; // ISO 8601 日期字符串
}
