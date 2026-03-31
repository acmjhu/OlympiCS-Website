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

                {/* Contact Section */}
                <div className = "mt-12 bg-blue-50 rounded-lg p-6 sm:p-8 border border-blue-100">
                    <p className="text-gray-700 mb-4">
                        If you have any questions, please don't hesitate to reach out to our organizing team.
                    </p>
                    <a
                        href="mailto:jhuacmofficers@gmail.com"
                        className="inline-flex items-center text-[#002D72] hover:text-[#001a47] font-semibold focus:outline-none focus:underline"
                    >
                        <svg 
                            className="w-5 h-5 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                            />
                        </svg>
                        jhuacmofficers@gmail.com
                    </a>
                    <p></p>
                    <a
                        href="mailto:jim@gmail.com"
                        className="inline-flex items-center text-[#002D72] hover:text-[#001a47] font-semibold focus:outline-none focus:underline"
                    >
                        <svg 
                            className="w-5 h-5 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                            />
                        </svg>
                        jim@gmail.com
                    </a>
                </div>
            </div>
        </main>
    );
}