import React from "react";

export default function FAQ() {
  return (
    <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-8 px-4 md:mt-16">
      <h1>Frequently Asked Questions</h1>
      <div className="flex flex-col gap-4">
      <Question
          question="What is LC-Pilot?"
          answer="This is a clone of Leetcode, with a basic subset of their features alongside AI capabilities to showcase where the AI can help on whatever you're stuck at in terms of coding for example."
        />
        <Question
          question="What AI will LC-Pilot use?" 
          answer="ChatGPT."
        />
        <Question
          question="Will the AI be able to understand any coding language?"
          answer="The AI will be able to folllow along with what you're stuck at, just as long as you specify what language you're stuck at."
        />
        <Question
          question="Who built this project?"
          answer= "https://github.com/j1yl https://github.com/NateGries1 https://github.com/CLawDann"
          />
        <Question
          question="What did we build this project with?"
          answer = "https://nextjs.org/ https://tailwindcss.com/ https://microsoft.github.io/monaco-editor/ https://github.com/engineer-man/piston"
          />
        <Question
          question = "Are there any known bugs for this project?"
          answer= "None at the moment."
          />
      </div>
    </div>
  );
}

interface QuestionProps {
  question: string;
  answer: string;
}

function Question({ question, answer }: QuestionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">{question}</h2>
      <p>{answer}</p>
    </div>
  );
}