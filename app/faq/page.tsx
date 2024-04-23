import React from 'react';
import dynamic from 'next/dynamic';
import styles from './App.module.css';

const Accordion = dynamic(() => import('./Accordion'), { ssr: false });

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Accordion title="What is LC-Pilot?">
          <p>This is a clone of Leetcode, with a basic subset of their features alongside AI capabilities to showcase where the AI can help on whatever you&apos;re stuck at in terms of coding for example.</p>
        </Accordion>
        <Accordion title="What AI will LC-Pilot use?">
          <p>Google Gemini.</p>
        </Accordion>
        <Accordion title="Will the AI be able to understand any coding language?">
          <p>The AI will be able to follow along with what you&apos;re stuck at, just as long as you specify what language you&apos;re stuck at.</p>
        </Accordion>
        <Accordion title="Who built this project?">
          <p>https://github.com/j1yl https://github.com/NateGries1 https://github.com/CLawDann</p>
        </Accordion>
        <Accordion title="What did we build this project with?">
          <p>https://nextjs.org/ https://tailwindcss.com/ https://microsoft.github.io/monaco-editor/ https://github.com/engineer-man/piston</p>
        </Accordion>
        <Accordion title="Are there any known bugs for this project?">
          <p>None at the moment.</p>
        </Accordion>
      </div>
    </div>
  );
};

export default App;
