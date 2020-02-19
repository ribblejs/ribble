/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import GithubSlugger from 'github-slugger'

export const Heading = ({ as = 'h1', id, title, children }) => {
  const Component = Styled[as]
  const identifier = id || new GithubSlugger().slug(title || children)

  return (
    <Component id={identifier}>
      <Styled.a
        className="anchor"
        sx={{
          color: 'text',
          textDecoration: 'none',
        }}
        href={`#${identifier}`}
        aria-hidden
      >
        {title || children}
      </Styled.a>
    </Component>
  )
}
