import { Metadata } from 'next';
import rulesData from '@/data/rules.json';

export const metadata: Metadata = {
  title: 'Rules & Guidelines | OlympiCS',
  description: 'Official rules, guidelines, and logistics for the JHU OlympiCS programming competition',
};

//aa

export default function RulesPage() {
  const { sections, lastUpdated } = rulesData;

  //true means rules will be displayed, false means "coming soon" will be displayed  
  const rulesReady = false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* top header */}
      <div className="bg-[#002D72] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Rules & Guidelines
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            {rulesReady /* header change based on rulesReady */
              ? 'What you need to know about participating in OlympiCS'
              : 'Competition guidelines are currently being finalized.'}
          </p>
          {rulesReady && (
            <p className="text-sm text-blue-200 mt-4">
              Last updated:{' '}
              {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {rulesReady ? ( /* if rulesReady = true, display this */
            <>
              {/* Table of Contents */}
              <nav
                className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-12 border-l-4 border-[#002D72]"
                aria-label="Table of contents"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-[#002D72]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Table of Contents
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center text-gray-700 hover:text-[#002D72] hover:bg-blue-50 p-3 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#002D72] focus:ring-offset-2"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-gray-100 group-hover:bg-[#002D72] group-hover:text-white text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 transition-colors duration-200">
                          {index + 1}
                        </span>
                        <span className="font-medium">{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Rules Sections */}
              <div className="space-y-12">
                {sections.map((section, sectionIndex) => (
                  <section
                    key={section.id} 
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-t-4 border-[#002D72]">
                      {/* Section Header */}
                      <div className="flex items-start mb-6">
                        <span className="flex-shrink-0 w-10 h-10 bg-[#002D72] text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
                          {sectionIndex + 1}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-1">
                          {section.title}
                        </h2>
                      </div>

                      {/* Rules List */}
                      <ol className="space-y-4 ml-14">
                        {section.rules.map((rule, ruleIndex) => (
                          <li
                            key={ruleIndex}
                            className="flex items-start group"
                          >
                            <span className="flex-shrink-0 w-7 h-7 bg-blue-50 text-[#002D72] rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-0.5 group-hover:bg-[#002D72] group-hover:text-white transition-colors duration-200">
                              {ruleIndex + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed text-lg flex-1">
                              {rule}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </section>
                ))}
              </div>

              {/* Back to Top Button */}
              <div className="mt-12 text-center">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-[#002D72] text-white font-semibold rounded-lg hover:bg-[#001a47] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] focus:ring-offset-2 shadow-md hover:shadow-lg"
                  aria-label="Back to top of page"
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
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Back to Top
                </a>
              </div>
            </>
          ) : (
            /* Rules coming soon section */
            <div className="bg-white rounded-lg shadow-md p-12 text-center border-t-4 border-[#002D72] mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rules Coming Soon
              </h2>
              <p className="text-gray-600 text-lg">
                Rules coming soon... please check back later!
              </p>
            </div> 
          )}

          {/* Contact Section (always on page) */} 
          <div className="mt-12 bg-blue-50 rounded-lg p-6 sm:p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Questions About the Rules? 
            </h3> 
            <p className="text-gray-700 mb-4">
              If you have any questions or need clarification on any of these
              rules, please don't hesitate to reach out to our organizing team.
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
          </div>
        </div>
      </div>
    </div>
  );
}