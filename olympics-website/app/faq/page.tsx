import { Metadata } from 'next';
import faqData from '@/data/faq.json';

export const metadata: Metadata = {
    title: 'FAQs | OlympiCS',
    description: 'Frequently asked questions about the JHU OlympiCS competition',
};

export default function RulesPage() {
    const { sections, lastUpdated } = faqData;

    // return (



    // )

}