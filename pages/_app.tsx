// pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

type PageConfig = {
  bgClass?: string
  textClass?: string
}

type AppPropsWithConfig = AppProps & {
  Component: AppProps['Component'] & { pageConfig?: PageConfig }
}

export default function App({ Component, pageProps }: AppPropsWithConfig) {
  const { bgClass, textClass } = Component.pageConfig ?? {}
  return (
    <Layout bgClass={bgClass} textClass={textClass}>
      <Component {...pageProps} />
    </Layout>
  )
}
