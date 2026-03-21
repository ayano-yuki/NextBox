import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'next-lab Docs',
    template: '%s | next-lab Docs'
  },
  description: 'Nextra Docs Theme starter configured from the official setup guide.'
}

const banner = (
  <Banner storageKey="next-lab-docs-banner">
    Nextra Docs Theme のセットアップが完了しました。
  </Banner>
)

const navbar = <Navbar logo={<strong>next-lab Docs</strong>} />
const footer = <Footer>{new Date().getFullYear()} © next-lab.</Footer>

export default async function RootLayout({ children }) {
  return (
    <html lang="ja" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/ayano-yuki/next-lab/tree/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
