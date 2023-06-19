import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from 'antd';



  const Login = ({ setFBName, setFBEmail, setFBUid}) => {
     // Link가 아닌 ,NavLink , useNavigate;
  const navigate = useNavigate();
  
  
  
  const onFinish = async (values) => {
    console.log('Success:', values);
    // Firebase로그인
    try {
      await firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password);
      // 로그인 된 사용자 정보를 가지고 온다
      const user = firebase.auth().currentUser; 
      console.log("로그인 성공");
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    }catch(error){
      console.error(error.code);
      
      
      
      if (error.code === "auth/invalid-email") {
        
        setModalMessage("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        
        setModalMessage("올바르지 않은 비밀번호입니다.");
      } else if (error.code === "auth/missing-email") {
        
        setModalMessage("이메일이 입력되지 않았습니다.");
      } else {
        
        setModalMessage("로그인이 실패하였습니다.");
      }
      showModal();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
    // Modal 기능
    const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalMessage, setModalMessage] = useState("");


   const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="p-6 m-5 shadow rounded bg-white flex flex-col">
      <h2>Login</h2>

      {/* AntD Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>

      {/* AntD form */}

        <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1280,
          margin: "0 auto"
        }}

        // 체크박스 해제
        initialValues={{
          remember: false,
        }}
        
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Email 을 입력해주세요!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item 
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요!',
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error('At least 6 passengers'));
                }
              },
            },
          ]}
        >
          <Input.Password minLength={6}/>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff" }}
          >
            로그인
          </Button>
            <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff"  }}
          >
           회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
