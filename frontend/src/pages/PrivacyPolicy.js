import React, { useEffect } from 'react';
import PageLayout from '../layouts/PageLayout.js';
import privacyContent from '../content/privacy.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';

const PrivacyPolicyPage = () => {
  usePageTracking();

  useEffect(() => {
    logger.info('Privacy policy page viewed');
  }, []);

  return (
    <PageLayout 
      title="Privacy Policy" 
      className="max-w-4xl"
      seoTitle="Privacy Policy | Right Tech Centre"
      seoDescription="Learn how we protect and use your personal information"
    >
      <div className="prose prose-lg mx-auto px-4 sm:px-6 py-8">
        {privacyContent.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="text-gray-700 space-y-4">
              {Array.isArray(section.content) ? (
                section.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <p>{section.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default React.memo(PrivacyPolicyPage);

