import React, { ChangeEvent, FC, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedDispatch } from '../../../hooks/redux'
import { addList, addTask } from '../../../store/slices/boardsSlice'
import { v4 } from 'uuid'
import { addLog } from '../../../store/slices/loggerSlice'
import { button, buttons, close, input, listForm, taskForm } from './DropDownForm.css'


type TDropDownFormProps = {
  boardId : string,
  listId : string,
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>
  list? : boolean
}
const DropDownForm : FC<TDropDownFormProps> = (
  {
    boardId,
    listId,
    setIsFormOpen,
    list
  }
) => {
  const [text,setText] = useState('');
  const formPlaceholer = list ? "리스트의 제목을 입력하세요" : "일의 제목을 입력하세요"
  const buttonTitle = list ? "리스트 추가하기" : "일 추가하기";
  const dispatch = useTypedDispatch();
  const handleTaskChange = (e : ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  const handleButtonClick = () => {
    if(text){
      if(list) {
        dispatch(addList({
          boardId,
          list : {listId: v4(), listName : text, tasks : []}
        }))
        dispatch(addLog({
          logId : v4(),
          logMessage : `리스트 생성하기 : ${text}`,
          logAuthor : "user",
          logTimestamp : String(Date.now())
        }))
      } else {
        dispatch(addTask({
          boardId, listId,
          task : {
            taskId : v4(),
            taskName : text,
            taskDescription : "",
            taskOwner : "user"
          }
        }));
        dispatch(addLog({
          logId : v4(),
          logMessage : `일 생성하기 : ${text}`,
          logAuthor : "user",
          logTimestamp : String(Date.now())
        }));
      }
    }
  }
  return (
    <div className = {list? listForm : taskForm}>
      <textarea autoFocus
      className={input}
      value = {text}
      onChange = {handleTaskChange}
      placeholder={formPlaceholer}
      onBlur = {() => setIsFormOpen(false)}/>
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close}/>
      </div>
      
    </div>
  )
}

export default DropDownForm
