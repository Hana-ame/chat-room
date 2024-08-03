// 240801

// 定义 Visibility 类型
export type Visibility = 'public' | 'unlisted' | 'private' | 'direct';

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
