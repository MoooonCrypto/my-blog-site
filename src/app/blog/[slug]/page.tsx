// Placeholder data for a blog post
const dummyPost = {
  slug: "mastering-react-hooks",
  title: "Mastering React Hooks",
  description: "A deep dive into useState, useEffect, and custom hooks.",
  date: "November 20, 2025",
  author: "Jules",
  content: `
    <h2 class="text-2xl font-bold mb-4">Introduction</h2>
    <p class="mb-4">React Hooks have revolutionized how we write components. They allow us to use state and other React features without writing a class. In this post, we'll explore the most common Hooks and learn how to create our own.</p>
    <h2 class="text-2xl font-bold mb-4">useState: The Foundation</h2>
    <p class="mb-4">The <code>useState</code> Hook is the most basic and essential Hook. It lets you add React state to function components.</p>
    <pre class="bg-muted p-4 rounded-md mb-4"><code class="language-jsx">const [count, setCount] = useState(0);</code></pre>
    <h2 class="text-2xl font-bold mb-4">useEffect: Handling Side Effects</h2>
    <p class="mb-4">The <code>useEffect</code> Hook lets you perform side effects in function components. Data fetching, subscriptions, or manually changing the DOM in React components are all examples of side effects.</p>
    <p class="mb-4">This is just a brief overview. The actual implementation will use MDX for richer content.</p>
  `,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = dummyPost;

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on {post.date} by {post.author}
          </p>
        </header>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
