
import React from 'react';
import Layout from '@/components/layout/Layout';
import EmailClient from '@/components/email/EmailClient';

const EmailPage = () => {
  return (
    <Layout>
      <div className="h-full">
        <EmailClient />
      </div>
    </Layout>
  );
};

export default EmailPage;
