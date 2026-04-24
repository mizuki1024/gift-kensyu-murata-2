import { notFound } from "next/navigation"
import Link from "next/link"

type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default async function PostDetailPage({
    params
}: {params:Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) notFound();

    const post: Post = await res.json();

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <Link href="/posts" className="text-sm text-blue-500 hover:underline mb-6 inline-block">
                ← 一覧へ戻る
            </Link>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 leading-relaxed">{post.body}</p>
            <p className="mt-4 text-xs text-gray-400">User ID: {post.userId}</p>
        </main>
    );
}