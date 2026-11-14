import type { ReactNode } from "react";

export function Card(props: { n: number; title: string; tag: string; children: ReactNode }) {
  return (
    <section className="card">
      <header>
        <span className="badge">#{props.n}</span>
        <h2>{props.title}</h2>
        <span className="tag">{props.tag}</span>
      </header>
      {props.children}
    </section>
  );
}
