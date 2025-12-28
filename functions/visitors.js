export async function onRequest(context) {
  const { DB } = context.env;

  const result = await DB.prepare(
    "SELECT * FROM visitors ORDER BY visited_at DESC LIMIT 100"
  ).all();

  return new Response(JSON.stringify(result.results), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
