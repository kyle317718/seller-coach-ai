import ManualGenerator from '@/components/ManualGenerator';

export default function ManualPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Manual Generator
            </h1>
            <ManualGenerator />
        </div>
    );
} 