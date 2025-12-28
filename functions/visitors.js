export async function onRequest(context) {
  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT * FROM visitors
    ORDER BY visited_at DESC
  `).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}
