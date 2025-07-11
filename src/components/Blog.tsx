import { RichText } from "@/components/RichText";

export default function Blog({ docs }) {
  return (
    <div>
      {docs.map((doc) => (
        <article key={doc.id}>
          <h1>{doc.title}</h1>
          {/* 'data' es el objeto JSON bajo 'content' */}
          <RichText data={doc.content} />
        </article>
      ))}
    </div>
  );
}
