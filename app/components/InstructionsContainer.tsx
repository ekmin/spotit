import React from "react";

type Example = {
  description: string;
  examples?: string[];
};

type contentType = {
  purpose_and_use: Example;
  specifications: Example;
  quality: Example;
  price: Example;
  brand: Example;
  ratings: Example;
  warranty: Example;
  availability: Example;
  terms: Example;
  conclusion: Example;
};

interface contentProps {
  content: contentType;
}

const removeAsterisks = (text: string) => text.replace(/\*\*/g, '');

const InstructionsContainer = ({ content }: contentProps) => {
  return (
    <div className="max-w-6xl mx-auto my-10 p-8 shadow-lg rounded-xl">
      {Object.keys(content).map((key) => {
        const section = content[key as keyof contentType];
        return (
          <div key={key}>
            <h2 className="text-lg font-bold mb-2 mt-4 uppercase text-secondary-dark-color">
              {key.replace(/_/g, " ")}
            </h2>
            <p className="text-base mb-2 font-semibold">{section.description}</p>
            {section.examples && (
              <ul>
                {section.examples.map((example, index) => (
                  <li key={index}>{removeAsterisks(example)}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InstructionsContainer;
