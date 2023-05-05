import StyledLink from '@components/link/styled';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const components = {
  a: (props: JSX.IntrinsicElements['a']) => (
    <StyledLink {...props}>{props.children}</StyledLink>
  ),
  ul: (props: JSX.IntrinsicElements['ul']) => (
    <ul {...props} className="list-disc marker:text-tw-gray ml-4 space-y-2">
      {props.children}
    </ul>
  ),
  h1: (props: JSX.IntrinsicElements['h1']) => (
    <h1 {...props} className="text-2xl font-bold">
      {props.children}
    </h1>
  ),
  h2: (props: JSX.IntrinsicElements['h2']) => (
    <h2 {...props} className="text-xl font-bold">
      {props.children}
    </h2>
  ),
};

export default function CustomMDX(props) {
  return (
    // @ts-expect-error Async Server Component Workaround
    <MDXRemote
      {...props}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
