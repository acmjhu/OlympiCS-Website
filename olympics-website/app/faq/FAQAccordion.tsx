'use client';

import { useState } from 'react';

interface FAQItem {
    id: string;
    Question: string;
    Answer: string;
}

interface FAQAccordionProps {
    sections: FAQItem[];
}

export default function FAQAccordion({ sections }: FAQAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleQuestion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-3">
            {sections.map((item) => (
                <div 
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        aria-expanded={openId === item.id}
                        aria-controls={`answer-${item.id}`}
                    >
                        <span className="font-medium text-gray-900">
                            {item.Question}
                        </span>
                        <span className={`transform transition-transform duration-200 ${openId === item.id ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    <div
                        id={`answer-${item.id}`}
                        className={`px-6 overflow-hidden transition-all duration-200 ${openId === item.id ? 'py-4 border-t border-gray-100' : 'max-h-0'}`}
                    >
                        <p className="text-gray-600">{item.Answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}