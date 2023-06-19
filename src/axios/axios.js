import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
      },
})
// Todo Get 기능
 const getTodo = async(setTodoData) => {
    try {
      const res = await axiosInstance.get("/todos")
      const result = res.data

      // 문제가 무엇인가하면.... "true", "false" 문자열로 들어옮
      const todosArr = result.map((item) => {
        if(item.comoleted === "true") {
          item.comoleted = true;
        } else {
          item.comoleted =false
        }
        // item.completed =JSON.parse(item.completed)
        // item.id = JSON.parse(item.id)
        return item

      })
      setTodoData(todosArr)
    } catch (error){
      console.log(error)
    }  
  }
// Todo Post 기능 (Form.js)
  const postTodo = async (newTodo) => {
   try{
    const res = await axiosInstance.post("/todos", newTodo)
    const data = res.data
    console.log(data)
   }catch (error){
    console.log(error)
   }
  }

// Todo Patch 기능
const patchTitleTodo = async (_id, editTitle) => {
    try{
    const res = await axiosInstance.patch(`/todos/${_id}`, { title: editTitle, completed: false, })
    const result = res.data
    console.log(result)
  } catch (error) {
  console.log(error)
  }
}

const patchCompletedTodo = async(_id, item)  => {
    try{
    const res = await axiosInstance.patch(`/todos/${_id}`, {
        completed: item.completed,
    });
    const result = res.data
    console.log(result)
    } catch (error){
    console.log (error)
    }
};


// Todo Delete 기능
const deleteTodo = async _id => {
    try{
    const res = await axiosInstance.delete(`/todos/${_id}`)
    const result = res.data
    console.log(result)
    } catch (error) {
    console.log(error)
    }
}

// 전체 목록 지우기
const deleteAllTodo= async() => {
    try {
        const res = await axiosInstance.get("/todos")
        const result = res.data

        result.forEach(item => {
    deleteTodo(item.id)
    });

    } catch (error){
    console.log(error)
    }  
}
export {axiosInstance, getTodo, patchTitleTodo, patchCompletedTodo, deleteTodo, postTodo, deleteAllTodo,};