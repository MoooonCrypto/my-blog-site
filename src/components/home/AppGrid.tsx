type AppItem = {
  id: string;
  title: string;
  iconUrl: string | null;
  platform: string;
  url: string | null;
};

type AppGridProps = {
  products: AppItem[];
};


export default function AppGrid({ products }: AppGridProps) {
  return (
    <section aria-label="アプリ一覧">
      <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 md:grid-cols-8">
        {products.map((product, index) => {
          const icon = (
            <div
              className="group flex cursor-pointer flex-col items-center gap-2 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl sm:h-16 sm:w-16">
                {product.iconUrl ? (
                  <img
                    src={product.iconUrl}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
                    <span className="font-heading text-xl font-bold text-primary/60">
                      {product.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <p className="line-clamp-2 text-center text-xs font-medium leading-tight">
                {product.title}
              </p>
            </div>
          );

          return product.url ? (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          ) : (
            <div key={product.id}>{icon}</div>
          );
        })}
      </div>
    </section>
  );
}
