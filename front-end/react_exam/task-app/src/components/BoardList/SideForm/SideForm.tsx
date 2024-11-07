import React, { FC, useState } from 'react'
import { FiCheck } from 'react-icons/fi';
import { icon, input, sideForm } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type TSideFormProps = {
  setFormOpen : React.Dispatch<React.SetStateAction<boolean>>
}
const SideForm : FC<TSideFormProps> = ({
  setFormOpen
}) => {
  const dispatch = useTypedDispatch();
  const [inputText, setInputText] = useState('');
  const handleClick = () => {
    if(inputText){
      dispatch(
        addBoard({board : {
          boardId : uuidv4(),
          boardName : inputText,
          lists : []
        }})
      )
      dispatch(
        addLog({
          logId : uuidv4(),
          logMessage : `게시판 등록 : ${inputText}`,
          logAuthor : "User",
          logTimestamp : String(Date.now())
        })
      )
    }
  }
  return (
    <div className={sideForm}>
      <input className={input}
      autoFocus
      type="text" 
      placeholder='새로운 게시판 등록하기'
      value = {inputText}
      onChange={(e) => (setInputText(e.target.value))}
      onBlur={() => (setFormOpen(false))} />
      <FiCheck className={icon}
      onMouseDown={handleClick}/>
    </div>
  )
}

export default SideForm
