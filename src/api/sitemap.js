const API_URL = "https://my-backend-j4fz.onrender.com";
const SITE_URL = "https://tile-store-b7wm.vercel.app";

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const products = await response.json();

    const staticPages = [
      {
        url: `${SITE_URL}/`,
        priority: "1.0",
        changefreq: "weekly",
      },
      {
        url: `${SITE_URL}/catalog`,
        priority: "0.9",
        changefreq: "daily",
      },
    ];

    const productPages = Array.isArray(products)
      ? products
          .filter((product) => product && product.slug)
          .map((product) => ({
            url: `${SITE_URL}/product/${encodeURIComponent(
              product.slug
            )}`,
            priority: "0.8",
            changefreq: "weekly",
          }))
      : [];

    const pages = [
      ...staticPages,
      ...productPages,
    ];

    const urls = pages
      .map(
        (page) => `
  <url>
    <loc>${escapeXml(page.url)}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.status(200).send(sitemap);
  } catch (error) {
    console.error("Sitemap error:", error);

    return res.status(500).send(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
    );
  }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}