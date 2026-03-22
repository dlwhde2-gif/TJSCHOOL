-- ================================================
-- Supabase SQL Editor에서 이 내용 전체 붙여넣고 Run!
-- ================================================

-- 기존 테이블 삭제 후 재생성 (필요시)
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS histories CASCADE;
DROP TABLE IF EXISTS popups CASCADE;
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- users 테이블
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  phone TEXT,
  "isApproved" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- posts 테이블
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  "boardType" TEXT NOT NULL,
  "isNotice" BOOLEAN NOT NULL DEFAULT false,
  image TEXT,
  "fileData" TEXT,
  "fileName" TEXT,
  "fileType" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- galleries 테이블
CREATE TABLE galleries (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- popups 테이블
CREATE TABLE popups (
  id SERIAL PRIMARY KEY,
  image TEXT NOT NULL,
  link TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- histories 테이블
CREATE TABLE histories (
  id SERIAL PRIMARY KEY,
  year TEXT NOT NULL,
  month TEXT NOT NULL,
  content TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- settings 테이블
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 비활성화 (개발 단계)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE galleries DISABLE ROW LEVEL SECURITY;
ALTER TABLE popups DISABLE ROW LEVEL SECURITY;
ALTER TABLE histories DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- 초기 admin 계정
INSERT INTO users (username, password, name, role, "isApproved")
VALUES ('admin', '1111', '관리자', 'admin', true);

SELECT 'All tables created and RLS disabled!' AS result;
