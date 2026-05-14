import type { Root, Code } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Transforms ` ```mermaid ` fenced code blocks into `<Mermaid chart="..."/>` MDX JSX nodes.
 * The actual `<Mermaid>` component is provided by `mdx-components.tsx`.
 */
export const remarkMermaid: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'code', (node: Code, index, parent) => {
    if (node.lang !== 'mermaid' || !parent || index == null) return;
    const value = node.value;
    parent.children[index] = {
      type: 'mdxJsxFlowElement',
      name: 'Mermaid',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'chart',
          value,
        },
      ],
      children: [],
      data: { _mdxExplicitJsx: true },
    } as never;
  });
};
