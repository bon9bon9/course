import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const finalSpaceCharacters =[
  {
    id : 'gary',
    name : 'Gary Goodspeed'
  },
  {
    id : 'cato',
    name : 'Little Cato'
  },
  {
    id : 'kvn',
    name : 'KVN'
  }
]
function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters)
  const handleEnd = (result) => {
    console.log(result)
    if(!result.destination) return; // 목적지 없으면 함수 종료해버려
    const items = Array.from(characters);
    // 1. 변경시키는 아이템을 배열에서 지운다
    // 2. return값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderedItem);
    setCharacters(items);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder} {/* placeholder 추가 */}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
