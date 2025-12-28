export async function onRequest() {
  const { results } = await DB.prepare(`
    SELECT * FROM visitors
    ORDER BY visited_at DESC
    LIMIT 100
  `).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}
