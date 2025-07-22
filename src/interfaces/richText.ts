export type RichTextNode =
  | RichTextBlock
  | RichTextHeading
  | RichTextParagraph
  | RichTextLink
  | RichTextYoutube
  | RichTextUpload
  | RichTextText
  | RichTextList
  | RichTextListItem
  | RichTextRelationship
  | { type: "horizontalrule" };

export interface BaseNode {
  type: string;
  children?: RichTextNode[];
}

export interface RichTextList extends BaseNode {
  type: "list";
  listType: "number" | "bullet" | "check";
  start?: number;
  children: RichTextNode[];
}
export interface RichTextListItem extends BaseNode {
  type: "listitem";
  checked?: boolean;
  children: RichTextNode[];
}
export interface RichTextRelationship extends BaseNode {
  type: "relationship";
  relationTo: string;
  value: any;
}
export interface RichTextBlock extends BaseNode {
  type: "root";
  children: RichTextNode[];
}

export interface RichTextHeading extends BaseNode {
  type: "heading";
  tag?: string;
  children: RichTextText[];
}

export interface RichTextParagraph extends BaseNode {
  type: "paragraph";
  children: RichTextNode[];
  indent?: number;
}

export interface RichTextLink extends BaseNode {
  type: "link";
  fields: { url: string; newTab?: boolean };
  children: RichTextText[];
}

export interface RichTextYoutube extends BaseNode {
  type: "youtube";
  id: string;
}

export interface RichTextUpload extends BaseNode {
  type: "upload";
  value: { url: string; alt?: string };
}

export interface RichTextText {
  type: "text";
  text: string;
  format?: number;
}

export interface RichTextRendererProps {
  nodes: RichTextNode[];
  payloadBaseUrl?: string;
  overrides?: Partial<Record<string, React.FC<any>>>;
}

export interface BlogDoc {
  id: string;
  title: string;
  publishedAt?: string;
  smallImage?: { url: string; alt?: string };
  content: { root: { children: RichTextNode[] } };
}

export interface BlogEntryProps {
  blog: BlogDoc;
  payloadBaseUrl?: string;
}

export interface BlogListProps {
  docs: BlogDoc[];
}
