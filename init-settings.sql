-- Supabase SQL Editor에서 실행: 어드민 기본 이미지 설정 초기화
-- 이미 값이 있으면 스킵 (ON CONFLICT DO NOTHING)

INSERT INTO settings (key, value) VALUES
  ('mainImage', '"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"'),
  ('subImage', '"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"')
ON CONFLICT (key) DO NOTHING;

SELECT key, value FROM settings;
