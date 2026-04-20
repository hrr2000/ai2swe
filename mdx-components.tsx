import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/content/CodeBlock";
import Callout from "@/components/content/Callout";
import AnalogyBox from "@/components/content/AnalogyBox";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
      <CodeBlock {...props}>{children}</CodeBlock>
    ),
    Callout,
    AnalogyBox,
  };
}
