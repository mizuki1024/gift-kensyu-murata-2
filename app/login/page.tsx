'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/app/action/auth'
import { useState } from 'react'

const schema = z.object({
    email: z.string().email('正しくメールアドレスを入力してください'),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
})

type formData = z.infer<typeof schema>

export default function LoginPage() {
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<formData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: formData) => {
        setServerError(null)
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        const result = await login(formData)
        if (result?.error) {
            setServerError(result.error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="email" placeholder="メールアドレス" {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <input type="password" placeholder="パスワード" {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            {serverError && <p>{serverError}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'ログイン中...' : 'ログイン'}
            </button>
        </form>
    )
}
