"use client";
interface Props {
  children: React.ReactNode;
  alignRight?: boolean;
  className?: string;
  id?: string;
  href?: string;
}

export function NavButton({
  children,
  alignRight,
  className,
  id,
  href,
}: Props) {
  return (
    <button
      onClick={() => {
        if (href) {
          window.location.href = href;
        }
      }}
      className={
        "px-4 py-2 rounded-lg" +
        (className ? " " + className : "") +
        (alignRight ? " ml-auto" : "")
      }
      id={id}
    >
      {children}
    </button>
  );
}
