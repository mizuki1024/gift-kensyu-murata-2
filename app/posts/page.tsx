import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";

type Post = {
    id: number;
    title: string;
    body: string;
};

export default async function PostPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts : Post[] = await res.json();

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <a key={post.id} href={`/posts/${post.id}`} className="group block h-full">
                        <Card className="h-full flex flex-col transition hover:shadow-lg">
                            <CardHeader>
                                <span className="text-xs font-mono text-muted-foreground mb-1">
                                    #{post.id}
                                </span>
                                <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription className="line-clamp-3">
                                    {post.body}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="text-xs text-primary font-medium">
                                続きを読む →
                            </CardFooter>
                        </Card>
                    </a>
                ))}
            </div>
        </main>
    )
}