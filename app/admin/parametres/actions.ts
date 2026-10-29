'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function setMaintenanceModeAction(formData: FormData) {
  const supabase = await createClient()
  const enabled = formData.get('enabled') === 'true'

  const { error } = await supabase.from('settings').update({ value: String(enabled) }).eq('key', 'maintenance_mode')
  if (error) throw new Error(error.message)

  revalidatePath('/admin/parametres')
  revalidatePath('/')
}
