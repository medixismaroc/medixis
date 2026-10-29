import { createClient } from '@/lib/supabase/server'

export async function isMaintenanceMode(): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single()
  return data?.value === 'true'
}
