import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createdTask, deleteTask, updateTaskStatus } from './action'

const STATUS_OPTIONS = ['todo', 'in_progress', 'done'] as const

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[tasks] Supabase query error:', JSON.stringify(error))
    throw new Error(error.message)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>

      <form action={createdTask} className="flex gap-2 mb-8">
        <input
          type="text"
          name="title"
          placeholder="新しいタスクを入力"
          required
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2 text-sm hover:bg-zinc-700"
        >
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-zinc-500 text-sm">タスクがありません。</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 border rounded px-4 py-3"
            >
              <span className="flex-1 text-sm">{task.title}</span>

              <form
                action={async (formData) => {
                  'use server'
                  const status = formData.get('status') as string
                  await updateTaskStatus(task.id, status)
                }}
              >
                <select
                  name="status"
                  defaultValue={task.status}
                  className="text-xs border rounded px-2 py-1"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button type="submit" className="ml-2 text-xs text-blue-600 hover:underline">
                  更新
                </button>
              </form>

              <form
                action={async () => {
                  'use server'
                  await deleteTask(task.id)
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-red-500 hover:underline"
                >
                  削除
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
