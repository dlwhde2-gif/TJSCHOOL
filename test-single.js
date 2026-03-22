import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://silkedhuqpuknpuauqwd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbGtlZGh1cXB1a25wdWF1cXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjI5NjAsImV4cCI6MjA4OTY5ODk2MH0.SvSuHXjVxRXhO39ueKLpkuGjfjiKIm-dMHguvJVKnpE"

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSingle() {
  console.log('Testing .single() with non-existent key...')
  const { data, error, status } = await supabase.from('settings').select('*').eq('key', 'NON_EXISTENT').single()
  console.log('Status:', status)
  if (error) {
    console.error('Error:', error.message, error.code)
  } else {
    console.log('Data:', data)
  }
}

testSingle()
