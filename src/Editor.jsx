// src/Editor.jsx
import React, { useState, useEffect } from 'react';

const Editor = ({ components, updateComponentValue, moveComponent, deleteComponent }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isEditable, setIsEditable] = useState([]);

  useEffect(() => {
    setIsEditable(components.map(() => true));
  }, [components]);

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('draggedIndex');
    if (draggedIndex) {
      moveComponent(parseInt(draggedIndex, 10), dropIndex);
      setDraggingIndex(null);
    } else {
      const componentType = e.dataTransfer.getData('component');
      moveComponent({ type: componentType, value: getDefaultComponentValue(componentType) }, dropIndex);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (index, e) => {
    setDraggingIndex(index);
    e.dataTransfer.setData('draggedIndex', index);
  };

  const getDefaultComponentValue = (componentType) => {
    switch (componentType) {
      case 'heading': return 'Heading';
      case 'paragraph': return 'Paragraph';
      case 'button': return 'Button';
      case 'image': return 'https://via.placeholder.com/150';
      case 'input': return 'Input';
      default: return '';
    }
  };

  const handleBlur = (index, e) => {
    const value = e.target.textContent || e.target.src || e.target.value;
    updateComponentValue(index, value);
    setIsEditable(isEditable.map((editable, i) => (i === index ? false : editable)));
  };

  const renderComponent = (component, index) => {
    switch (component.type) {
      case 'heading':
        return (
          <h1
            contentEditable={isEditable[index]}
            onBlur={(e) => handleBlur(index, e)}
            suppressContentEditableWarning={true}
          >
            {component.value}
          </h1>
        );
      case 'paragraph':
        return (
          <p
            contentEditable={isEditable[index]}
            onBlur={(e) => handleBlur(index, e)}
            suppressContentEditableWarning={true}
          >
            {component.value}
          </p>
        );
      case 'button':
        return (
          <button
            contentEditable={isEditable[index]}
            onBlur={(e) => handleBlur(index, e)}
            suppressContentEditableWarning={true}
          >
            {component.value}
          </button>
        );
      case 'image':
        return <img src={component.value} alt="Placeholder" />;
      case 'input':
        return (
          <input
            type="text"
            defaultValue={component.value}
            onBlur={(e) => handleBlur(index, e)}
            readOnly={!isEditable[index]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="editor">
      {components.map((component, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(index, e)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
          className="editor-item"
        >
          {renderComponent(component, index)}
          <button onClick={() => deleteComponent(index)} className='removeBtn'>X</button>
        </div>
      ))}
      <div
        className="drop-zone"
        onDrop={(e) => handleDrop(e, components.length)}
        onDragOver={handleDragOver}
      >
        Drop here
      </div>
    </div>
  );
};

export default Editor;
