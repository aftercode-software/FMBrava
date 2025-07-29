import { fetchImagenPresign } from "@/utils/fetchImagen";
import {
  createElement,
  Fragment,
  type ReactNode,
} from "react";
import DentroBlog from "../ads/DentroBlog";
import type {
  BlogEntryProps,
  BlogListProps,
  RichTextBlock,
  RichTextHeading,
  RichTextLink,
  RichTextList,
  RichTextListItem,
  RichTextNode,
  RichTextParagraph,
  RichTextRelationship,
  RichTextRendererProps,
  RichTextText,
  RichTextUpload,
  RichTextYoutube,
} from "@/interfaces/richText";
import Image from "./Image";

function renderInlineText(textNode: RichTextText) {
  let content: ReactNode = textNode.text;
  const { format = 0 } = textNode;

  if (format & 4) content = <s key="strike">{content}</s>;
  if (format & 2) content = <em key="italic">{content}</em>;
  if (format & 1) content = <strong key="bold">{content}</strong>;
  if (format & 32) content = <sub key="sub">{content}</sub>;
  if (format & 64) content = <sup key="sup">{content}</sup>;
  return content;
}

export function RichTextRenderer({
  nodes,
  overrides = {},
}: RichTextRendererProps) {
  const renderNode = (node: RichTextNode, index: number): ReactNode => {
    if (overrides[node.type]) {
      const Component = overrides[node.type]!;
      return <Component key={index} node={node} />;
    }

    switch (node.type) {
      case "heading": {
        const tag = (node as RichTextHeading).tag || "h2";
        return createElement(
          tag,
          { key: index, className: "text-white font-inter font-bold text-2xl" },
          (node as RichTextHeading).children.map((child, idx) => (
            <Fragment key={idx}>{renderInlineText(child)}</Fragment>
          ))
        );
      }
      case "paragraph": {
        const pNode = node as RichTextParagraph;
        if (pNode.indent && pNode.indent > 0) {
          return (
            <div
              key={index}
              className="font-inter text-gray-200 mb-8 text-lg border-l-4 border-[#FADC48] pl-6"
            >
              {pNode.children.map((c, i) =>
                c.type === "text"
                  ? renderInlineText(c as RichTextText)
                  : renderNode(c as RichTextNode, i)
              )}
            </div>
          );
        }

        return (
          <p key={index} className="text-white font-inter text-lg my-2">
            <Fragment key={index}>
              {pNode.children.map((c, i) =>
                c.type === "text"
                  ? renderInlineText(c as RichTextText)
                  : renderNode(c as RichTextNode, i)
              )}
            </Fragment>
          </p>
        );
      }
      case "link": {
        const { url, newTab } = (node as RichTextLink).fields;
        return (
          <a
            key={index}
            href={url}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
            className="text-amarillo font-inter text-lg font-semibold"
          >
            {(node as RichTextLink).children.map((child, idx) =>
              renderInlineText(child)
            )}
          </a>
        );
      }
      case "youtube": {
        const videoId = (node as RichTextYoutube).id;
        return (
          <div key={index} className="video-container my-4">
            <iframe
              width="560"
              height="560"
              className="w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      case "upload": {
        console.log("upload node:", node);
        const { url, alt } = (node as RichTextUpload).value;
        if (!url) {
          return null;
        }
        return <Image key={index} url={url} alt={alt} />;
      }
      case "text":
        return (
          <Fragment key={index}>
            {renderInlineText(node as RichTextText)}
          </Fragment>
        );
      case "list": {
        const listNode = node as RichTextList;
        const Tag = listNode.listType === "number" ? "ol" : "ul";

        const attrs: Record<string, any> = {
          key: index,
          className:
            listNode.listType === "check"
              ? ""
              : listNode.listType === "number"
              ? "list-decimal ml-6"
              : "list-disc ml-6",
        };
        if (listNode.listType === "number" && listNode.start !== undefined) {
          attrs.start = listNode.start;
        }
        return createElement(
          Tag,
          attrs,
          listNode.children.map((item, i) => renderNode(item, i))
        );
      }

      case "listitem": {
        const li = node as RichTextListItem;
        if (typeof li.checked === "boolean") {
          return (
            <li
              key={index}
              className="flex items-center space-x-2 text-white font-inter text-lg"
            >
              <input
                type="checkbox"
                checked={li.checked}
                readOnly
                className="accent-amarillo"
              />
              <span className={li.checked ? "line-through" : ""}>
                {li.children.map((c, i) =>
                  c.type === "text"
                    ? renderInlineText(c as RichTextText)
                    : renderNode(c, i)
                )}
              </span>
            </li>
          );
        }
        return (
          <li key={index} className="text-white font-inter text-lg">
            {li.children.map((c, i) =>
              c.type === "text"
                ? renderInlineText(c as RichTextText)
                : renderNode(c, i)
            )}
          </li>
        );
      }

      case "relationship": {
        const rel = node as RichTextRelationship;
        if (rel.relationTo === "ads") {
          return <DentroBlog key={index} ad={rel.value} />;
        }
        return null;
      }

      case "horizontalrule":
        return <hr key={index} className="my-6 border-gray-600" />;
      case "root":
        return (
          <>
            {(node as RichTextBlock).children.map((child, idx) =>
              renderNode(child, idx)
            )}
          </>
        );
      default:
        return null;
    }
  };

  return <>{nodes.map((node, idx) => renderNode(node, idx))}</>;
}

export async function BlogEntry({ blog }: BlogEntryProps) {
  const { title, publishedAt, smallImage, content } = blog;
  const nodes = content.root.children;

  const imageSrc = smallImage ? await fetchImagenPresign(smallImage.url) : null;

  return (
    <article className="max-w-\[720px\] mx-auto p-4 text-white font-inter">
      <h1 className="text-white font-inter text-3xl mb-2">{title}</h1>
      {publishedAt && (
        <p className="mb-2 text-sm text-gray-300">
          <small>Publicado: {new Date(publishedAt).toLocaleDateString()}</small>
        </p>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={smallImage?.alt || ""}
          className="max-w-full h-auto mb-4"
        />
      )}
      <RichTextRenderer nodes={nodes} />
    </article>
  );
}

export function BlogList({ docs }: BlogListProps) {
  return (
    <div className="space-y-8">
      {docs.map((doc) => (
        <BlogEntry key={doc.id} blog={doc} />
      ))}
    </div>
  );
}
