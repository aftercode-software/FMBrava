import { fetchImagenPresign } from "@/utils/fetchImagen";
import React from "react";

export type RichTextNode =
  | RichTextBlock
  | RichTextHeading
  | RichTextParagraph
  | RichTextLink
  | RichTextYoutube
  | RichTextUpload
  | RichTextText;

interface BaseNode {
  type: string;
  children?: RichTextNode[];
}

interface RichTextBlock extends BaseNode {
  type: "root";
  children: RichTextNode[];
}

interface RichTextHeading extends BaseNode {
  type: "heading";
  tag?: string;
  children: RichTextText[];
}

interface RichTextParagraph extends BaseNode {
  type: "paragraph";
  children: RichTextNode[];
  indent?: number;
}

interface RichTextLink extends BaseNode {
  type: "link";
  fields: { url: string; newTab?: boolean };
  children: RichTextText[];
}

interface RichTextYoutube extends BaseNode {
  type: "youtube";
  id: string;
}

interface RichTextUpload extends BaseNode {
  type: "upload";
  value: { url: string; alt?: string };
}

interface RichTextText {
  type: "text";
  text: string;
  format?: number;
}

interface RichTextRendererProps {
  nodes: RichTextNode[];
  payloadBaseUrl?: string;
  overrides?: Partial<Record<string, React.FC<any>>>;
}

function renderInlineText(textNode: RichTextText) {
  let content: React.ReactNode = textNode.text;
  const { format = 0 } = textNode;

  if (format & 4) content = <s key="strike">{content}</s>;
  if (format & 2) content = <em key="italic">{content}</em>;
  if (format & 1) content = <strong key="bold">{content}</strong>;

  return content;
}

export function RichTextRenderer({
  nodes,
  payloadBaseUrl = "",
  overrides = {},
}: RichTextRendererProps) {
  const [imageUrls, setImageUrls] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const uploads = nodes.flatMap(function findUploads(
      node: RichTextNode
    ): RichTextUpload[] {
      if (node.type === "upload") return [node as RichTextUpload];
      if ("children" in node && node.children) {
        return node.children.flatMap(findUploads);
      }
      return [];
    });
    Promise.all(
      uploads.map(async (upload) => {
        const src = await fetchImagenPresign(upload.value.url);
        return { url: upload.value.url, src };
      })
    ).then((results) => {
      const urlMap: Record<string, string> = {};
      results.forEach(({ url, src }) => {
        urlMap[url] = src;
      });
      setImageUrls(urlMap);
    });
  }, [nodes]);

  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    if (overrides[node.type]) {
      const Component = overrides[node.type]!;
      return <Component key={index} node={node} />;
    }

    switch (node.type) {
      case "heading": {
        const tag = (node as RichTextHeading).tag || "h2";
        return React.createElement(
          tag,
          { key: index, className: "text-white font-inter font-bold text-2xl" },
          (node as RichTextHeading).children.map((child, idx) =>
            renderInlineText(child)
          )
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
          <p key={index} className="text-white font-inter  text-lg mb-4">
            {pNode.children.map((c, i) =>
              c.type === "text"
                ? renderInlineText(c as RichTextText)
                : renderNode(c as RichTextNode, i)
            )}
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
        const { url, alt } = (node as RichTextUpload).value;
        const src = imageUrls[url];
        return src ? (
          <img
            key={index}
            src={src}
            alt={alt || ""}
            className="max-w-full h-auto"
          />
        ) : (
          <span key={index}>Cargando imagen...</span>
        );
      }
      case "text":
        return (
          <React.Fragment key={index}>
            {renderInlineText(node as RichTextText)}
          </React.Fragment>
        );
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

// --- Blog components ---

export interface BlogDoc {
  id: string;
  title: string;
  publishedAt?: string;
  smallImage?: { url: string; alt?: string };
  content: { root: { children: RichTextNode[] } };
}

interface BlogEntryProps {
  blog: BlogDoc;
  payloadBaseUrl?: string; // no longer needed for image
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

interface BlogListProps {
  docs: BlogDoc[];
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
