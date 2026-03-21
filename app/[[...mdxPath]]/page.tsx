import type { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

type MdxPageParams = {
  mdxPath?: string[]
}

type MdxPageProps = {
  params: Promise<MdxPageParams>
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export const generateMetadata = async (
  props: MdxPageProps
): Promise<Metadata> => {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents({}).wrapper

const Page = async (props: MdxPageProps) => {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
    params.mdxPath
  )

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

export default Page
