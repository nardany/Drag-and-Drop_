// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import './App.css';

const App = () => {
  const [components, setComponents] = useState([]);
  const [isEditable, setIsEditable] = useState([]);

  const addComponent = (component) => {
    setComponents([...components, component]);
    setIsEditable([...isEditable, true]);
  };

  const updateComponentValue = (index, value) => {
    const newComponents = [...components];
    newComponents[index].value = value;
    setComponents(newComponents);
  };

  const deleteComponent = (index) => {
    const newComponents = components.filter((_, i) => i !== index);
    const newIsEditable = isEditable.filter((_, i) => i !== index);
    setComponents(newComponents);
    setIsEditable(newIsEditable);
  };

  const moveComponent = (draggedComponent, dropIndex) => {
    if (typeof draggedComponent === 'number') {
      // Reordering existing component within the editor
      const newComponents = [...components];
      const [movedComponent] = newComponents.splice(draggedComponent, 1);
      newComponents.splice(dropIndex, 0, movedComponent);

      const newIsEditable = [...isEditable];
      const [movedEditability] = newIsEditable.splice(draggedComponent, 1);
      newIsEditable.splice(dropIndex, 0, movedEditability);

      setComponents(newComponents);
      setIsEditable(newIsEditable);
    } else {
      // Adding new component from sidebar
      const newComponents = [...components];
      newComponents.splice(dropIndex, 0, draggedComponent);
      setComponents(newComponents);
      setIsEditable([...isEditable, true]);
    }
  };

  return (
    <div className="app">
      <Sidebar addComponent={addComponent} />
      <Editor
        components={components}
        updateComponentValue={updateComponentValue}
        moveComponent={moveComponent}
        deleteComponent={deleteComponent}
      />
    </div>
  );
};

export default App;
