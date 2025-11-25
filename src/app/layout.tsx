import Script from 'next/script';

type Props = {
  children: React.ReactNode;
}

const LAYOUT = (props: Props) =>{
  const { children } = props;
  
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

export default LAYOUT;