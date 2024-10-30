import { useState } from "react";
import {Button} from 'react-bootstrap';

type Todo = {
  id : number;
  text : string;
  isChecked : boolean;
}
export const TodoList : React.FC = () => { // Function Component의 약자
  const title : string = "오늘 할일";
  // 리액트는 이런 일반 변수가 아니라 state를 통해 저장한다
  // state가 바뀐 경우 바꾸는 상태관리를 해준다
  const [todos, setTodos] = useState<Todo[]>([
    {id : 1, text : '공부하기', isChecked : false},
    {id : 2, text : '잠자기', isChecked : false},
    {id : 3, text : '미팅하기', isChecked : false}
  ]);

  const [newTodo, setNewTodo] = useState<string>('');
  // todos : state의 데이터
  // setTodos : 변경 함수
  // => 구조 분해 할당
  // 데이터를 설정하고 그 구조를 분해해서 저장하는것
  // const colors = ['red','green','blue'];
  // const [f,s,t] = colors
  // 거꾸로 하나의 객체를 풀어서(분해해서) 저장함
  const handleCheckedChange = (todoId : number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === todoId ? {...item, isChecked : !item.isChecked} : item
    ));
  }
  const addTodo = () => {
    if(newTodo.trim() ! !== ''){
      setTodos([...todos,{id:Date.now(),text:newTodo,isChecked:false}]);
      setNewTodo('');
    }
  }

  const deleteTodo = (todoId : number) => {
    setTodos((prevTodos) => (
      prevTodos.filter(todo => todo.id !== todoId)
    ))
  }

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);


  const handleTodoClick = (todo : Todo) => {
    setShowDetail(true);
    setSelectedTodo(todo);
  }

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedTodo(null);
  }
  return(
    <div>
      <h1>{title}</h1>
      <p></p>
      <div>
        <div>
          <input type = "text"
            placeholder="할일 입력"
            style = {{marginRight:'10px',writingMode :'horizontal-tb'}}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <Button variant = "warning"
            onClick={addTodo}>추가</Button>
        </div>
        <p></p>
        <div className="board">
          <ul>
            {
              todos.map((todo,index) => (
                <li key = {todo.id}>
                  <input type = "checkbox"
                    onChange={()=>{
                      handleCheckedChange(todo.id);
                    }}></input>
                  <span onClick={() => {
                    handleTodoClick(todo);
                  }}>
                    {
                      todo.isChecked ?
                      <del>{todo.text}</del>
                      : <span>{todo.text}</span>
                    }
                  </span>
                  <button className="delbutton"
                    onClick={() => {
                      deleteTodo(todo.id)}}
                  > 삭제 </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}