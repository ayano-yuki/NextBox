import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  // Include generated Pagefind assets in the server trace for the route handler.
  outputFileTracingIncludes: {
    '/_pagefind/\\[\\.\\.\\.path\\]': ['./.pagefind/**/*']
  }
})
