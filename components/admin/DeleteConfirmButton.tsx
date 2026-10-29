'use client'

import { useTransition } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import type { DeleteResult } from '@/app/admin/revalidate'

interface DeleteConfirmButtonProps {
  action: (formData: FormData) => Promise<DeleteResult>
  id: string
  confirmMessage?: string
}

export function DeleteConfirmButton({ action, id, confirmMessage = 'Supprimer définitivement ?' }: DeleteConfirmButtonProps) {
  const [pending, startTransition] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!confirm(confirmMessage)) return
        const formData = new FormData(e.currentTarget)
        startTransition(async () => {
          const { error } = await action(formData)
          if (error) alert(error)
        })
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
        title="Supprimer"
      >
        {pending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
      </button>
    </form>
  )
}
