import Link from 'next/link';

export default function AnalysisCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} className="border rounded-lg p-6 hover:shadow-md transition-shadow block">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </Link>
  );
}
