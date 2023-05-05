import { Route } from 'next';
import Link from 'next/link';

export default function StyledLink(props: JSX.IntrinsicElements['a']) {
  if (!props?.href) throw Error('Href must be defined');
  const className = props.className
    ? props.className
    : props.className === null
    ? undefined
    : 'text-tw-gray hover:text-tw-black focus:text-tw-black dark:hover:text-tw-white dark:focus:text-tw-white';

  if (props.href.startsWith('/')) {
    return (
      <Link {...props} href={props.href as Route} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <a
      {...props}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {props.children}
    </a>
  );
}
