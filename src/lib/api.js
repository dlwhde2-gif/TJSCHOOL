import { getSupabase } from './supabase';

export const uploadFile = async (file, folder = 'uploads') => {
  const supabase = getSupabase();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('yujung-storage')
    .upload(filePath, file);

  if (uploadError) {
    console.error(uploadError);
    throw new Error('파일 업로드 실패');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('yujung-storage')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const createPost = async (postData) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('posts').insert([postData]).select();
  if (error) throw error;
  return data[0];
};

export const getPosts = async (boardType) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('posts').select('*').eq('boardType', boardType);
  if (error) throw error;
  return data;
};
