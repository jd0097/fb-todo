
import React, { useState } from "react";
import { postTodo } from "../axios/axios";

const Form = ({ todoData, setTodoData, fbName, fbEmail }) => {
  // add data(state 변수)
  const [value, setValue] = useState("");

  // input type="text"의 value 변경 리랜더링
  const handleChange = e => {
    setValue(e.target.value);
  };

  // form submit 실행
  const handleSubmit = e => {
    // 웹 브라우저 URL로 데이터 전송을 막아야 한다.
    // 마치 a태그의 href 막아주듯이
    e.preventDefault();
    // 새로운 todo 객체를 만들어준다.
    // 형식, 즉 데이터의 구조를 지켜주어야 한다.

    // 정규표현식 처리 예정

    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
      author: fbName,
      email: fbEmail,
    };
    // state에 저장하면 화면이 리랜더링 된다.
    // todoData에 데이터 추가
    // set함수 즉 setTodoData에서 state를 가지고 오기 위해서는 set 함수에 인자로 콜백함수를 전달한다.

    // setTodoData(todoData => {
    //   return [...todoData, newTodo];
    // });

    setTodoData([...todoData, newTodo]);
    // 로컬 스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify([...todoData, newTodo]));
    // axios post 호출 fbtodolist 추가하기 (서버로 보냄)
    // axiosInstance.post("/todos", newTodo)
    // .then(res => res.data)
    // .then(data => console.log(data)) 
    // .catch(error=> console.log(error))
        
    // axios get 호출  자료 받기
      postTodo(newTodo)
  


    // 입력창 초기화
    setValue("");
  };


  
 
  return (
    <div>
      <form
        className="flex pt-2"
        style={{
          display: "flex"
        }}
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-3 py-2 mr-4 text-blue-500 border rounded shadow"
          type="text"
          name="value"
          style={{
            flex: "10",
            padding: "5px"
          }}
          placeholder="할일을 입력해주세요."
          value={value}
          onChange={handleChange}
        />
        <input
          className="p-2 text-stone-700 border-2 border-stone-600 rounded hover:text-white hover:bg-stone-400 cursor-pointer"
          type="submit"
          value="입력"
          style={{
            flex: "1"
          }}
        />
      </form>
    </div>
  );
};

export default Form;
