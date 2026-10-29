import { revalidatePath } from 'next/cache'

/** Après chaque modification : régénère l'accueil et toutes les pages de gammes. */
export function refreshPublicSite() {
  revalidatePath('/', 'layout')
}

export type DeleteResult = { error?: string }

/**
 * Message à afficher après une suppression. Une suppression refusée par la
 * sécurité Supabase (RLS) ne renvoie pas d'erreur : seulement 0 ligne supprimée.
 */
export function deleteOutcome(error: { message: string } | null, deleted: unknown[] | null): DeleteResult {
  if (error) return { error: `La suppression a échoué : ${error.message}` }
  if (!deleted?.length) return { error: "Rien n'a été supprimé : élément introuvable ou droits insuffisants." }
  return {}
}
