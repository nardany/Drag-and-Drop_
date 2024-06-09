import React, { useState } from 'react';
import './App.css';

const EditableComponent = ({ component, handleDragStart, updateComponentContent }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(component.content);

  const renderComponent = () => {
    switch (component.type) {
      case 'Heading':
        return (
          <h1
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onInput={(e) => setContent(e.currentTarget.textContent)}
            onBlur={() => { updateComponentContent(component.id, content); setEditing(false); }}
            onDoubleClick={() => setEditing(true)}
          >
            {content || 'Heading'}
          </h1>
        );
      case 'Paragraph':
        return (
          <p
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onInput={(e) => setContent(e.currentTarget.textContent)}
            onBlur={() => { updateComponentContent(component.id, content); setEditing(false); }}
            onDoubleClick={() => setEditing(true)}
          >
            {content || 'Paragraph'}
          </p>
        );
      case 'Button':
        return (
          <button
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onInput={(e) => setContent(e.currentTarget.textContent)}
            onBlur={() => { updateComponentContent(component.id, content); setEditing(false); }}
            onDoubleClick={() => setEditing(true)}
          >
            {content || 'Button'}
          </button>
        );
      case 'Image':
        return (
          <img
            src={content || 'https://via.placeholder.com/150'}
            alt="Placeholder"
            onDoubleClick={() => {
              const url = prompt('Enter image URL:', content);
              if (url) {
                setContent(url);
                updateComponentContent(component.id, url);
              }
            }}
          />
        );
      case 'Input':
        return (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => updateComponentContent(component.id, content)}
            onDoubleClick={() => setEditing(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`editable-component draggable-component ${component.type.toLowerCase()}`}
      draggable
      onDragStart={handleDragStart}
    >
      {renderComponent()}
    </div>
  );
};

export default EditableComponent;
