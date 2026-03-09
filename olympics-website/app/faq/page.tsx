import { Metadata } from 'next';
import faqData from '@/data/faq.json';
import FAQAccordion from '@/app/faq/FAQAccordion';

export const metadata: Metadata = {
    title: 'FAQs | OlympiCS',
    description: 'Frequently asked questions about the JHU OlympiCS competition',
};

export default function FAQPage() {
    const { sections, lastUpdated } = faqData;

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-600">
                        Find answers to common questions about OlympiCS
                    </p>
                </div>

                {/* Accordion Component */}
                <FAQAccordion sections={sections} />

                {/* Last Updated */}
                <p className="text-sm text-gray-500 mt-6 text-center">
                    Last updated: {lastUpdated}
                </p>
            </div>
        </main>
    );
}