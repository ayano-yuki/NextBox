import Script from 'next/script';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Script 
          src="https://embed.zenn.studio/js/listen-embed-event.js"
        />
        {children}
      </body>
    </html>
  );
}