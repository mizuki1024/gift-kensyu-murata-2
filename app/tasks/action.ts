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

export async function getTasks() {
  const { supabase, user } = await getAuthenticatedClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createdTask(formData: FormData) {
  const title = formData.get('title') as string
  if (!title?.trim()) return

  const { supabase, user } = await getAuthenticatedClient()
  const { error } = await supabase
    .from('tasks')
    .insert({ title, user_id: user.id })

  if (error) throw new Error(error.message)
  revalidatePath('/tasks')
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
