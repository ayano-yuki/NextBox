import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Preview } from '$/docs/Preview'
import { SourceFile } from '$/docs/SourceFile'

const themeComponents = getThemeComponents()

export const useMDXComponents = (components) => ({
  ...themeComponents,
  Preview,
  SourceFile,
  ...components
})
