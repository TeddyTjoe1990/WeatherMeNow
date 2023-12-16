// pages/about.tsx
import React from 'react';
import Weather from '../components/Layout';
import Layout from '../components/Layout';

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <Weather title="Weather Information" defaultCity="Default City" />
  </Layout>
);

export default AboutPage;
