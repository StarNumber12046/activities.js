import { ReactElement, ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  title?: string;
};

export default function Page({ children, title }: PageProps): ReactElement {
  return (
    <main>
      {title && <h1>{title}</h1>}
      {children}
    </main>
  );
}

