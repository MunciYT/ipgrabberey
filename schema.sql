CREATE TABLE IF NOT EXISTS visitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  user_agent TEXT,
  visited_at TEXT
);
