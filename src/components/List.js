import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  return (
    <div>
      {todoData.map(item => (
        <ListItem
          key={item.id}
          item={item}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
};

// 리랜더링 최적화를 위한 코드
export default React.memo(List);
