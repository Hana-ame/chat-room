// 240801
import { Visibility, Status } from "./types";

// ~~it doesnt work, dunno why.~~
export async function apiV1Sessions() {
  const response = await fetch('/api/v1/sessions', {
    method: 'GET',
    credentials: 'include', // 这确保cookie会被发送和接收
  });
  return response.json()
}

export function apiV1DeleteSession(id: string) {
  return fetch(`/api/v1/session/${id}`, {
    method: 'DELETE',
    credentials: 'include', // 这确保cookie会被发送和接收
  });
}

export function apiV1Login({ email, password }: { email: string, password: string }) {
  return fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // 这确保cookie会被发送和接收
  });
}

export function apiV1Register({ email, username, password }: { email: string, username: string, password: string }) {
  return fetch('/api/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });
  
}

export function apiV1CreateStatus({
  content,
  warning = '',
  visibility = 'public',
}: {
  content: string;
  warning?: string;
  visibility?: Visibility;
}) {
  return fetch('/api/v1/status/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, warning, visibility }),
    credentials: 'include', // 确保 cookie 被发送和接收
  });
}

export async function apiV1GetStatuses(
  limit?: number,
  maxId?: number,
  minId?: number
): Promise<Status[]> {
  const queryParams: URLSearchParams = new URLSearchParams();
  if (limit !== undefined)
    queryParams.append('limit', limit.toString());

  if (maxId !== undefined) {
    queryParams.append('max_id', maxId.toString());
  }

  if (minId !== undefined) {
    queryParams.append('min_id', minId.toString());
  }

  const response = await fetch(`/api/v1/statuses/?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store'
    },
    credentials: 'include', // 确保 cookie 被发送和接收
  });

  if (!response.ok) {
    // 处理响应错误
    const errorData = await response.json();
    throw new Error(errorData.error || '获取状态失败');
  }

  const data: Status[] = await response.json();
  return data;
}