// src/Sidebar.jsx
import React from 'react';
import './App.css';

const Sidebar = ({ addComponent }) => {
  const components = ['heading', 'paragraph', 'button', 'image', 'input'];

  const handleClick = (componentType) => {
    addComponent({ type: componentType, value: getDefaultComponentValue(componentType) });
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

  return (
    <div className="sidebar">
      {components.map((component, index) => (
        <div
          key={index}
          className="sidebar-item"
          draggable
          onDragStart={(e) => e.dataTransfer.setData('component', component)}
          onClick={() => handleClick(component)}
        >
          {component.charAt(0).toUpperCase() + component.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

