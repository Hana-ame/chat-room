// it doesnt work, dunno why.
export async function profileLoader() {
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