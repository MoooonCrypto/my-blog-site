// ダミーデータ
const dummyPost = {
  slug: "mastering-react-hooks",
  title: "React Hooksをマスターする",
  description: "useState, useEffect, カスタムフックの詳細解説。",
  date: "2025年11月20日",
  author: "mokosau",
  content: `
    <h2 class="text-2xl font-bold mb-4">はじめに</h2>
    <p class="mb-4">React Hooksは、私たちがコンポーネントを記述する方法に革命をもたらしました。これにより、クラスを記述することなくstateやその他のReactの機能を使用できます。この記事では、最も一般的なHooksを探求し、独自のフックを作成する方法を学びます。</p>
    <h2 class="text-2xl font-bold mb-4">useState: 基本のフック</h2>
    <p class="mb-4"><code>useState</code>は最も基本的で不可欠なフックです。関数コンポーネントにReactのstateを追加することができます。</p>
    <pre class="bg-muted p-4 rounded-md mb-4"><code class="language-jsx">const [count, setCount] = useState(0);</code></pre>
    <h2 class="text-2xl font-bold mb-4">useEffect: 副作用の処理</h2>
    <p class="mb-4"><code>useEffect</code>フックを使用すると、関数コンポーネントで副作用を実行できます。データの取得、購読、またはReactコンポーネントでのDOMの手動変更はすべて副作用の例です。</p>
    <p class="mb-4">これは簡単な概要です。実際の구현では、よりリッチなコンテンツのためにMDXを使用します。</p>
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
            投稿日: {post.date} by {post.author}
          </p>
        </header>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
