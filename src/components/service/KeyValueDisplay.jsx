import React from 'react';

// Utility function to get nested property value
export const getNestedValue = (obj, path) => {
  return path.split("->").reduce((acc, part) => acc && acc[part.trim()], obj);
};

// Component to render key-value pairs based on the specified properties
const KeyValueDisplay = ({ data, properties }) => {
  const renderProperty = (data, property) => {
    const key = property.includes("->") ? property.split("->")[0].trim() : property;
    const nestedKey = property.includes("->") ? property.split("->")[1].trim() : null;
    const value = nestedKey ? getNestedValue(data, property) : data[key];

    return (
      <div key={property} style={{ marginBottom: "8px" }}>
        <strong>{key}: </strong>
        <span>{String(value)}</span>
      </div>
    );
  };

  return (
    <div>{properties.map((property) => renderProperty(data, property))}</div>
  );
};

export default KeyValueDisplay;
