export async function profileLoader() {
  const response = await fetch('/api/v1/sessions', {
    method: 'GET',
    credentials: 'include', // 这确保cookie会被发送和接收
  });
  return response.json()
}