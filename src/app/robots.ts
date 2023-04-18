export default function robots() {
 return {
  sitemap: "https://jacobbolden.com/sitemap.xml",
  host: "https://jacobbolden.com",
  rules: [{ userAgent: "*" }, { userAgent: "*", disallow: ["/error/"] }],
 };
}
