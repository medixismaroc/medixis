'use client'

import { useState } from 'react'
import { Loader2, Upload, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  name: string
  label: string
  defaultValue?: string | null
  folder: string
  accept?: string
}

// Mêmes limites que le bucket (supabase/migrations/0002_storage_limits.sql).
const MAX_BYTES = 10 * 1024 * 1024
const IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/avif'

/** Envoie le fichier dans le bucket « medixis-images » et stocke son adresse publique dans un champ caché. */
export function ImageUpload({ name, label, defaultValue, folder, accept = IMAGE_TYPES }: Props) {
  const [url, setUrl] = useState(defaultValue ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const isImage = accept.startsWith('image')

  async function onFile(file: File) {
    setError('')
    if (!accept.split(',').includes(file.type)) {
      setError(isImage ? 'Format non accepté : JPEG, PNG, WebP ou AVIF.' : 'Format non accepté : PDF uniquement.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('Fichier trop lourd : 10 Mo maximum.')
      return
    }
    setBusy(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from('medixis-images').upload(path, file, { upsert: false })
    if (error) {
      setError("L'envoi a échoué. Réessayez.")
    } else {
      setUrl(supabase.storage.from('medixis-images').getPublicUrl(path).data.publicUrl)
    }
    setBusy(false)
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        {url && isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-20 w-20 rounded-lg border border-line bg-paper-alt object-contain" />
        )}
        {url && !isImage && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-navy underline">
            Voir le fichier
          </a>
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink hover:border-navy">
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
          {url ? 'Remplacer' : 'Choisir un fichier'}
          <input type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
        {url && (
          <button type="button" onClick={() => setUrl('')} className="flex items-center gap-1 text-sm text-muted hover:text-red-700">
            <X size={14} /> Retirer
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  )
}
