import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  // 1. users
  if (db.users) {
      console.log('Seeding users...');
      const { error } = await supabase.from('users').upsert(db.users);
      if (error) console.error('Error seeding users:', error);
  }

  // 2. settings (convert object to rows)
  if (db.settings) {
      console.log('Seeding settings...');
      const settingsEntries = Object.entries(db.settings).map(([key, value]) => ({
          key,
          value: JSON.stringify(value),
          updatedAt: new Date().toISOString()
      }));
      const { error } = await supabase.from('settings').upsert(settingsEntries, { onConflict: 'key' });
      if (error) console.log('Error seeding settings:', error);
  }

  // 3. popups
  if (db.popups) {
      console.log('Seeding popups...');
      const { error } = await supabase.from('popups').upsert(db.popups);
      if (error) console.log('Error seeding popups:', error);
  }

  // 4. posts
  if (db.posts) {
      console.log('Seeding posts...');
      const { error } = await supabase.from('posts').upsert(db.posts);
      if (error) console.log('Error seeding posts:', error);
  }

  // 5. galleries
  if (db.galleries) {
      console.log('Seeding galleries...');
      const mappedGalleries = db.galleries.map(g => ({
          ...g,
          image: g.image || g.img // map img to image if image is missing
      })).map(({img, ...rest}) => rest); // remove img key if it exists
      const { error } = await supabase.from('galleries').upsert(mappedGalleries);
      if (error) console.log('Error seeding galleries:', error);
  }

  // 6. histories
  if (db.histories) {
      console.log('Seeding histories...');
      const { error } = await supabase.from('histories').upsert(db.histories);
      if (error) console.log('Error seeding histories:', error);
  }

  console.log('Seed completed!');
}

seed();
