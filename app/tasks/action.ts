'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function getTasks() {
    const { data,error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(error.message)
    return data
}

export async function createdTask(formData: FormData) {
    const title = formData.get('title') as string

    const { error } = await supabase 
      .from('tasks')
      .insert({ title, user_id: 'dummy-user-id'})
    
    if (error) throw new Error(error.message)
        revalidatePath('/tasks')
}

export async function updateTaskStatus(id: number, status: string) {
    const { error } = await supabase
      .from('tasks')
      .update({ status, updated_at:new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw new Error(error.message)
        revalidatePath('/tasks')
}

export async  function deleteTask(id: number) {
    const { error } =await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)
    revalidatePath('/tasks')
}
