import React, { useEffect, useState } from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { getTodo ,deleteAllTodo} from "../axios/axios";


const Todo = ({fbName, fbEmail, fbUid}) => {
  const navigator = useNavigate();
  
  // 백엔드반에 DB table 구성에 활용한다.
  // FB, MongoDB 에서는 Collection 구성에 활용한다. 
  console.log(fbName,fbEmail);

  // JsonServer 데이터 (state 변수)
  const initTodoData = [];
  const [todoData, setTodoData] = useState(initTodoData);

  const handleRemoveClick = () => {
    setTodoData([]);
    // 로컬 스토리지 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
    deleteAllTodo();

  };


  // uid 없는 경우 로그인으로 바로 보내기
  useEffect(() => {
    // if(fbUid === "") {
    if(!fbUid) {
      navigator("/login")
    }
  }, []);



  // axios get 호출  자료 받기
  useEffect(() => {
    getTodo(setTodoData)
  }, []);

  return (
    <div className="flex items-center justify-center w-full mt-5">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3 ">
          <h1 className="w-3/4 text-2xl text-stone-700 font-bold">
            Firebase TodoList
          </h1>
          <button
            onClick={handleRemoveClick}
            className="p-2 text-stone-700 border-2 border-stone-600 rounded hover:text-white hover:bg-stone-400"
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} fbName={fbName} fbEmail={fbEmail}/>
      </div>
    </div>
  );
};

export default Todo;
