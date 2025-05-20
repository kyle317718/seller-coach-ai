export default function AnalysisSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
