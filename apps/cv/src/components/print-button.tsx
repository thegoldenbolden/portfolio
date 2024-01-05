'use client';


export function PrintButton(
  props: React.ComponentProps<'button'>,
): React.ReactNode {
  return (
    <button
      type="button"
      {...props}
      onClick={() => {
        window.print();
      }}
    >
      {props.children}
    </button>
  );
}
