export async function onRequest(context) {
  const req = context.request;
  const cf = req.cf || {};

  const ip = req.headers.get("cf-connecting-ip");

  await context.env.DB.prepare(`
    INSERT INTO visitors (ip, country, city, region, user_agent, visited_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    ip,
    cf.country || "unknown",
    cf.city || "unknown",
    cf.region || "unknown",
    req.headers.get("user-agent"),
    new Date().toISOString()
  ).run();

  return context.next();
}
