import React from 'react';
import Accordion from '../../components/Accordion'; 
import styles from './App.module.css';

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
          <p><a href="https://github.com/j1yl">Joe</a> <a href="https://github.com/NateGries1">Nate</a> <a href="https://github.com/CLawDann">Daniel</a></p>
        </Accordion>
        <Accordion title="What did we build this project with?">
          <p><a href="https://nextjs.org/">Next.js</a> <a href="https://tailwindcss.com/">Tailwind CSS</a> <a href="https://microsoft.github.io/monaco-editor/">Monaco Editor</a> <a href="https://github.com/engineer-man/piston">Piston</a></p>
        </Accordion>
        <Accordion title="Are there any known bugs for this project?">
          <p>Only few minor errors that won't disturb much from the project. That's all.</p>
        </Accordion>
      </div>
    </div>
  );
};

export default App;