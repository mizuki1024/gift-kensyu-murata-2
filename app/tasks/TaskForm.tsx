'use client'

import { useActionState } from 'react'
import { createdTask } from './action'

export function TaskForm() {
  const [state, action, pending] = useActionState(createdTask, null)

  return (
    <form action={action} className="flex flex-col gap-2 mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="新しいタスクを入力"
          required
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-black text-white rounded px-4 py-2 text-sm hover:bg-zinc-700 disabled:opacity-50"
        >
          {pending ? '追加中...' : '追加'}
        </button>
      </div>
      {state?.error && (
        <p className="text-red-600 font-mono text-xs">{state.error}</p>
      )}
    </form>
  )
}
