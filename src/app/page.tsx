import AppGrid from "@/components/home/AppGrid";
import { getPublishedProducts } from "@/lib/api/products";

export const dynamic = "force-dynamic";


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

export default async function Home() {
  const products = await getPublishedProducts();
  const appItems = products.map((product) => ({
    id: product.id,
    title: product.title,
    iconUrl: product.icon_url,
    platform: product.platform,
    url: getAppUrl(product),
  }));

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {products.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            まだ公開されているプロダクトがありません
          </p>
        ) : (
          <AppGrid products={appItems} />
        )}
      </div>
    </div>
  );
}
