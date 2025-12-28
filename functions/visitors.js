export async function onRequest(context) {
  const { DB } = context.env;

  if (!DB) {
    return new Response("DB missing", { status: 500 });
  }

  const { results } = await DB.prepare(`
    SELECT * FROM visitors
    ORDER BY visited_at DESC
    LIMIT 100
  `).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}
