'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@/app/action/auth'
import { useState } from 'react'

const schema = z.object({
    email: z.string().email('正しくメールアドレスを入力してください'),
    password: z.string().min(8, 'パスワードは８文字以上で入力してください'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
})

type formData = z.infer<typeof schema>

export default function RegisterPage() {
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<formData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: formData) => {
        setServerError(null)
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        const result = await signUp(formData)
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
            <div>
                <input type="password" placeholder="パスワード確認" {...register('confirmPassword')} />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            {serverError && <p>{serverError}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : 'サインアップ'}
            </button>
        </form>
    )
}
