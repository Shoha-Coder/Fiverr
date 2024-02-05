import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
                window.replainSettings = { id: '80d78b4c-85a1-4ee0-bd4e-36756763a78c' };
                (function(u){var s=document.createElement('script');s.async=true;s.src=u;
                var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
                })('https://widget.replain.cc/dist/client.js');
              `,
        }} />
      </Head>
      <body className={`p200:min-w-[800px]`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}