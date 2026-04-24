'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

async function getAuthenticatedClient() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return { supabase, user }
}

export async function createdTask(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const title = formData.get('title') as string
  if (!title?.trim()) return null

  const { supabase, user } = await getAuthenticatedClient()

  const upsertResult = await supabase.from('users').upsert({
    id: user.id,
    email: user.email ?? '',
    name: (user.email ?? user.id).split('@')[0],
  }, { onConflict: 'id' })

  if (upsertResult.error) {
    return { error: `users upsert failed: ${upsertResult.error.message} (code: ${upsertResult.error.code})` }
  }

  const { error } = await supabase
    .from('tasks')
    .insert({ title, user_id: user.id })

  if (error) {
    return { error: `tasks insert failed: ${error.message} (code: ${error.code})` }
  }

  revalidatePath('/tasks')
  return null
}

export async function updateTaskStatus(id: number, status: string) {
  const { supabase, user } = await getAuthenticatedClient()
  const { error } = await supabase
    .from('tasks')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/tasks')
}

export async function deleteTask(id: number) {
  const { supabase, user } = await getAuthenticatedClient()
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/tasks')
}
