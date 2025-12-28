export async function onRequest(context) {
  const { DB } = context.env;

  if (!DB) {
    console.log("DB not bound");
    return context.next();
  }

  const req = context.request;
  const cf = req.cf || {};

  try {
    await DB.prepare(`
      INSERT INTO visitors (ip, country, city, region, user_agent, visited_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      req.headers.get("cf-connecting-ip"),
      cf.country || "unknown",
      cf.city || "unknown",
      cf.region || "unknown",
      req.headers.get("user-agent"),
      new Date().toISOString()
    ).run();
  } catch (e) {
    console.log("DB error:", e.message);
  }

  return context.next();
}
