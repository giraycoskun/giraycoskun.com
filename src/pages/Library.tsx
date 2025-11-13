import type { JSX } from "react";

const EMBED_URL =
  "https://giraycoskun.notion.site/ebd/51797f0e94b94da7998bb659ecb5cae9?v=a5832cf5567841a7aa37ed8790b66c01";

export default function Library(): JSX.Element {
  return (
    <div
      style={{
        padding: 24,
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></header>

      <div style={{ flex: 1, minHeight: 0 }}>
        <iframe
          title="Notion Library"
          src={EMBED_URL}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #eaeaea",
            borderRadius: 8,
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
