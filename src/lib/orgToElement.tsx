import { unified } from "unified";
import { uniorgSlug } from "uniorg-slug";
import rehypeStringify from "rehype-stringify";
import uniorgParse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import rehypeSanitize from "rehype-sanitize";
import { extractKeywords } from "uniorg-extract-keywords";
import rehypeShiki from "@shikijs/rehype";

const htmlProcessor = unified()
	.use(uniorgParse)
	.use(extractKeywords)
	.use(uniorgSlug) //add anchors headings
	.use(uniorg2rehype)

	.use(rehypeSanitize)
	.use(rehypeShiki, {
		theme: "github-dark",
	})
	.use(rehypeStringify);

export async function orgToHtml(org: string) {
	const result = await htmlProcessor.process(org);
	return result;
}

/*
import rehypeReact from "rehype-react";
import { createElement } from "react";
import * as prod from "react/jsx-runtime";
import Link from "@/components/Link";

const production = {
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  Fragment: prod.Fragment,
  components: {
    a: Link,
  },
};
const processorJSX = unified()
  .use(uniorg)
  .use(extractKeywords)
  .use(uniorgSlug)

  .use(uniorg2rehype)
  .use(rehypeSanitize)
// .use(rehypeReact, { production, createElement });

export function orgToJSX(org: string) {
  return <>{processorJSX.processSync(org).result}</>;
}
 */
