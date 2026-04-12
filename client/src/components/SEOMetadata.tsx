import { Helmet } from "react-helmet";

interface SEOMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function SEOMetadata({ 
  title = "SIQI - 式乃シト公式ウェブサイト", 
  description = "クリエイター兼個人開発者「式乃シト」の公式ポートフォリオ。Avatar UIなどのOSSプロジェクトや作品を紹介。",
  path = "/",
  ogImage = "/images/og-default.jpg"
}: SEOMetadataProps) {
  const siteUrl = "https://siqi.jp";
  const fullUrl = `${siteUrl}${path}`;
  const fullImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

  // JSON-LD for LLM Optimization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "式乃シト",
    "alternateName": "SIQI",
    "url": siteUrl,
    "image": fullImage,
    "sameAs": [
      "https://github.com/sito-sikino",
      "https://x.com/Sikino_Sito"
    ],
    "jobTitle": "Creator / Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "SIQI Label"
    },
    "description": description,
    "knowsAbout": ["Web Development", "UI Design", "Open Source Software", "Avatar UI"]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* LLM Optimization: Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
