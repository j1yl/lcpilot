import React from 'react';
import './Accordion.css';

interface AccordionProps {
  title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  return (
    <div className="accordion">
      <input type="checkbox" id={`accordion-${title}`} className="accordion-checkbox" />
      <label htmlFor={`accordion-${title}`} className="accordion-header">
        <div className="accordion-title">{title}</div>
        <div className="accordion-icon">&#x25BC;</div>
      </label>
      <div className="accordion-content">
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
