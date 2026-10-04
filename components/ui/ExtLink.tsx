/** Followed external citation link for use inside body-copy sentences (never nofollow, never in a link list). */
export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="text-brand-green underline hover:no-underline">
      {children}
    </a>
  )
}
