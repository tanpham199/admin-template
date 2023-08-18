import NextHead from 'next/head';

interface HeadProps {
  favicon?: string;
  pageTitle: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaImage?: string;
  metaUrl?: string;
}

const Head = ({
  favicon = '/favicon.ico',
  pageTitle,
  metaTitle,
  metaDescription,
  metaKeywords,
  metaImage,
  metaUrl,
}: HeadProps) => {
  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta property="og:type" content="website" />
      <link rel="icon" href={favicon} />
      {metaDescription != null && (
        <>
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
        </>
      )}
      {metaKeywords != null && <meta name="keywords" content={metaKeywords} />}
      {metaImage != null && <meta name="og:image" content={metaImage} />}
      {metaTitle != null && (
        <>
          <meta name="title" content={metaTitle} />
          <meta property="og:title" content={metaTitle} />
        </>
      )}
      {metaUrl && <meta property="og:url" content={metaUrl} />}
    </NextHead>
  );
};

export default Head;
