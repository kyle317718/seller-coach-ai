export default function Chart({ type }: { type?: string | null }) {
  return (
    <div style={{ height: 200, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span>차트 영역 (type: {type || "종합"})</span>
    </div>
  );
}
