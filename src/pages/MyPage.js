import React, { useEffect, useState } from "react";
import {MyPageDiv} from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

const MyPage = ({
    fbName,
    fbEmail,
    fbUid,
    setFBName,
    setFBEmail,
    setFBUid,
}) => {

  const navigate = useNavigate();
  const [nickName, setNickName] = useState(fbName);
  const [email, setEmail] = useState(fbEmail);
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");


useEffect (()=> {
    if(!fbUid) {
      // alert("로그인하세요");
      navigate("/")
    }
});

// FB의 사용자 정보 객체
const user = firebase.auth().currentUser

const handlerNickName = async e =>{
e.preventDefault();
try{
  await user.updateProfile({
  displayName:nickName,
  });
}catch(error) {
  setFBName(nickName);
  alert("닉네임 정보를 변경하였습니다.")
  console.log(error.code)
}
// console.log("프로필업데이트");
} 
const handlerNickEmail = async e =>{
  e.preventDefault();
  try{
    await user.updateEmail(email);
    setFBEmail(email);
    alert("이메일 정보를 변경하였습니다.")
  } catch(error) {
    if (error.code == "auth/email-already-in-use") {
      alert("The email address is already in use");
    } else if (error.code == "auth/invalid-email") {
      alert("The email address is not valid.");
    }
  }
  // console.log("이메일 업데이트");
} 

const handlerNickPassword = async e =>{
  e.preventDefault();
  try{
    await user.updatePassword(pw);
    alert("비밀번호를 변경하였습니다.");
  }catch (error) {
    if (error.code == "auth/weak-password") {
      alert("The password is too weak.");
    } else {
      alert("비밀번호 다시 입력해 주세요.");
    }
}
} 

const handlerDelete = async e => {
  e.preventDefault();
  try{
    await user.delete();
    alert("서비스 탈퇴하였습니다.");
    setEmail("")
    setNickName("")
    setFBUid("")
    navigate("/");
  } catch(error) {
    console.log(error);
  }
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>My Page</h2>
      {/* 1. emotion을 활용하여 tag의 용도를 구분한다.
          2. css도 함께 적용한다.
       */}
      <MyPageDiv>
        <form>
        <div> 
          <label htmlFor="">별칭</label>
          <input
            type="text"
            required
            value={nickName}
            minLength={2}
            maxLength={10}
            placeholder="별명을 입력하세요."
            onChange={e => setNickName(e.target.value)}
          />
          <button className="border rounded px-3 py-2 shadow" onClick={handlerNickName}>별칭 변경</button>
            </div>
          <div>
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
           <button  className="border rounded px-3 py-2 shadow" onClick={handlerNickEmail}>이메일 변경</button>
          </div>

          <div>

          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            value={pw}
            onChange={e => setPw(e.target.value)}
            minLength={8}
            maxLength={16}
          />
          <button  
          className="border rounded px-3 py-2 shadow"
           onClick={handlerNickPassword}>
            비밀번호 변경
            </button>
          </div>

          <div>
          <label htmlFor="">비밀번호 확인</label>

          <input
            type="password"
            required
            value={pwConfirm}
            onChange={e => setPwConfirm(e.target.value)}
            minLength={8}
            maxLength={16}
          />
          <button className="border rounded px-3 py-2 shadow">비밀번호 확인</button>
          </div>

          <div className="flex justify-center gap-5 w-full text-center">
          <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/"); 
              }}
            >
              회원탈퇴
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/"); 
              }}
            >
              취소
            </button>
          </div>
        </form>
      </MyPageDiv>
    </div>
  );
};

export default MyPage;
