import "./App.css";
import { useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
function App() {
  // console.log("App 랜더링")
  // 로컬 데이터 state 변수
  const initTodoData = localStorage.getItem("fbTodoData")
  ? JSON.parse(localStorage.getItem("fbTodoData"))
  : [];
const [todoData, setTodoData] = useState(initTodoData);

  const handleRemoveClick = () => {
    setTodoData([]);
    // 로컬스토리지 초기화 
    localStorage.setItem("fbTodoData", JSON.stringify([]));
  };

  return (
  
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
          <div className="flex justify-between mb-3">
          <h1 className=" text-center w-3/4 text-2xl text-indigo-600 font-semibold"> Firebase Todo-List
          </h1>
          <button className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]" onClick={handleRemoveClick}>Delete All</button>
          </div>
          {/* 할일 목록 */}
          <List todoData={todoData} setTodoData={setTodoData} />
          {/* 할일 추가 */}
          <Form todoData={todoData} setTodoData={setTodoData} />
          
        </div>
    </div>
  );
};

export default App;
