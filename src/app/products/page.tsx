import { getPublishedProducts } from "@/lib/api/products";

export const dynamic = "force-dynamic";

const PLATFORM_LABEL: Record<string, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
  other: "Other",
};

function getAppUrl(product: {
  platform: string;
  app_store_url?: string | null;
  play_store_url?: string | null;
  demo_url?: string | null;
}): string | null {
  if (product.platform === "ios") return product.app_store_url ?? null;
  if (product.platform === "android") return product.play_store_url ?? null;
  return product.demo_url ?? null;
}

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-10 text-center animate-fade-in-up opacity-0">
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-3">
            Products
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            開発したプロダクト一覧
          </p>
        </header>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">まだ公開されているプロダクトがありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8">
            {products.map((product, index) => {
              const appUrl = getAppUrl(product);
              const icon = (
                <div
                  className="group flex flex-col items-center gap-2 animate-fade-in-up opacity-0 cursor-pointer"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-border/50 bg-muted shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl">
                    {product.icon_url ? (
                      <img
                        src={product.icon_url}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
                        <span className="text-2xl md:text-3xl font-heading font-bold text-primary/60">
                          {product.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-tight">
                      {product.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {PLATFORM_LABEL[product.platform] ?? product.platform}
                    </p>
                  </div>
                </div>
              );

              return appUrl ? (
                <a
                  key={product.id}
                  href={appUrl}
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
        )}
      </div>
    </div>
  );
}
