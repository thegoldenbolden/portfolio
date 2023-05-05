import StyledLink from '@components/link/styled';
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  a: (props: JSX.IntrinsicElements['a']) => (
    <StyledLink {...props}>{props.children}</StyledLink>
  ),
};

export default function CustomMDX(props) {
  return (
    // @ts-expect-error Async Server Component Workaround
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
