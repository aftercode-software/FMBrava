"use client";

import React from "react";

// Define the union of possible node types
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

// Helper to render inline text with formatting
function renderInlineText(textNode: RichTextText) {
  let content: React.ReactNode = textNode.text;
  const { format = 0 } = textNode;

  // format bitmask: 1=bold, 2=italic, 4=strikethrough
  if (format & 4) {
    content = <s key="strike">{content}</s>;
  }
  if (format & 2) {
    content = <em key="italic">{content}</em>;
  }
  if (format & 1) {
    content = <strong key="bold">{content}</strong>;
  }

  return content;
}

// Main recursive renderer
export function RichTextRenderer({
  nodes,
  payloadBaseUrl = "",
  overrides = {},
}: RichTextRendererProps) {
  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    // Allow override for this type
    if (overrides[node.type]) {
      const Component = overrides[node.type]!;
      return <Component key={index} node={node} />;
    }

    switch (node.type) {
      case "heading": {
        const tag = (node as RichTextHeading).tag || "h2";
        return React.createElement(
          tag,
          { key: index },
          (node as RichTextHeading).children.map((child, idx) =>
            renderInlineText(child)
          )
        );
      }

      case "paragraph":
        return (
          <p key={index}>
            {(node as RichTextParagraph).children.map((child, idx) => {
              if (child.type === "text")
                return renderInlineText(child as RichTextText);
              return renderNode(child as RichTextNode, idx);
            })}
          </p>
        );

      case "link": {
        const { url, newTab } = (node as RichTextLink).fields;
        return (
          <a
            key={index}
            href={url}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
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
          <div key={index} className="video-container">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }

      case "upload": {
        const { url, alt } = (node as RichTextUpload).value;
        return (
          <img
            key={index}
            src={`${payloadBaseUrl}${url}`}
            alt={alt || ""}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }

      case "text":
        // Plain text node
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
        // Unhandled node types
        return null;
    }
  };

  return <>{nodes.map((node, idx) => renderNode(node, idx))}</>;
}
