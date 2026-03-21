import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Preview } from './components/docs/Preview'
import { SourceFile } from './components/docs/SourceFile'

const themeComponents = getThemeComponents()

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    Preview,
    SourceFile,
    ...components
  }
}
