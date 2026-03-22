import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://silkedhuqpuknpuauqwd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbGtlZGh1cXB1a25wdWF1cXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjI5NjAsImV4cCI6MjA4OTY5ODk2MH0.SvSuHXjVxRXhO39ueKLpkuGjfjiKIm-dMHguvJVKnpE"

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugSettings() {
  console.log('Querying settings...')
  // Try without .single() and without specific select
  const { data, error, status } = await supabase.from('settings').select('*')
  if (error) {
    console.error('Error Status:', status)
    console.error('Error Message:', error.message)
  } else {
    console.log('Data found:', data)
  }
}

debugSettings()
