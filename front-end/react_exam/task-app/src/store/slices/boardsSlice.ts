import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
  modalActive : boolean;
  boardArray : IBoard[];
}

type TAddBoardAction = {
  board : IBoard;
}

type TDeleteListAction = {
  boardId : string,
  listId : string
}

type TAddListAction = {
  boardId : string;
  list : IList;
}

type TAddTaskAction = {
  boardId : string;
  listId : string;
  task : ITask;
}

type TUpdateTaskAction = {
  boardId : string;
  listId : string;
  task : ITask;
}

type TDeleteTaskAction = {
  boardId : string;
  listId : string;
  taskId : string;
}

const initialState : TBoardState = {
  modalActive : false,
  boardArray : [
    {
      boardId : 'board-0',
      boardName : "첫번째 게시물",
      lists : [
        {
          listId : "list-0",
          listName : "List 1",
          tasks : [
            {
              taskId: "task-0",
              taskName : "Task 1",
              taskDescription : "Description",
              taskOwner : "john",
            },
            {
              taskId: "task-1",
              taskName : "Task 2",
              taskDescription : "Description",
              taskOwner : "john",
            }
          ]
        },
        {
          listId : "list-1",
          listName : "List 2",
          tasks : [
            {
              taskId: "task-2",
              taskName : "Task 3",
              taskDescription : "Description",
              taskOwner : "john",
            }
            
          ]
        }
      ]
    }
  ]
}

const boardsSlice = createSlice({
  name : "board",
  initialState,
  reducers : {
    addBoard : (state, {payload} : PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board)
    },
    deleteBoard : (state, {payload} : PayloadAction<string>) => {
      state.boardArray = state.boardArray.filter(board => board.boardId !== payload)
    },
    deleteList : (state, {payload} : PayloadAction<TDeleteListAction>) => {
      state.boardArray = state. boardArray.map(board =>
        board.boardId === payload.boardId ?
        {
          ...board,
          lists : board.lists.filter(list => list.listId !== payload.listId)
        }
        :board
      )
    },
    setModalActive : (state, {payload} : PayloadAction<boolean>) => {
      state.modalActive = payload
    },
    addList : (state, {payload} : PayloadAction<TAddListAction>) => {
      state.boardArray.map(board => 
        board.boardId === payload.boardId
        ? {...board, lists : board.lists.push(payload.list)}
        : board
      )
    },
    addTask : (state, {payload} : PayloadAction<TAddTaskAction>) => {
      state.boardArray.map(board => 
        board.boardId === payload.boardId
        ? {
          ...board,
          lists : board.lists.map(list =>
            list.listId === payload.listId
            ? { ... list, tasks : list.tasks.push(payload.task)}
            : list
          )
        }
        : board
      )
    },
    updateTask : (state, {payload} : PayloadAction<TUpdateTaskAction>) => {
      const board = state.boardArray.find(board => board.boardId === payload.boardId);
      const list = board?.lists.find(list => list.listId === payload.listId)
      if(list) {
        list.tasks = list.tasks.map(task => task.taskId === payload.task.taskId
          ? payload.task
          : task
        )
      }
    },
    deleteTask : (state, {payload} : PayloadAction<TDeleteTaskAction>) => {
      const board = state.boardArray.find(board => board.boardId === payload.boardId);
      const list = board?.lists.find(list => list.listId === payload.listId)
      if(list){
        list.tasks = list.tasks.filter(task => task.taskId !== payload.taskId)
      }
    }
  }
})

export const {addBoard, deleteBoard, deleteList, setModalActive, addList, addTask, updateTask, deleteTask} = boardsSlice.actions
export const boardsReducer = boardsSlice.reducer