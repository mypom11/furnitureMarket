import NewProduct from "@/components/new-product";
import { uiAction } from "@/store/ui-slice";
import React, { FormEventHandler, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const login = {
      id: idRef.current!.value,
      password: passwordRef.current!.value,
    };

    if (login.id.trim() === "test" && login.password.trim() === "test") {
      dispatch(uiAction.setIsLogin(true));
    } else {
      window.alert("로그인에 실패하였습니다.");
    }

    //testid = id:test 비번:test
  };

  return (
    <section className="relative h-screen">
      <div className="po_center w-1/4 rounded-lg border-[1px] border-solid border-dark bg-white p-12 shadow-md">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <p>관리자 아이디</p>
            <input
              type="text"
              ref={idRef}
              className="rounded-2 w-full rounded-md bg-gray-200 px-4 py-2"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="mb-8">
            <p>비밀번호</p>
            <input
              ref={passwordRef}
              type="password"
              className="rounded-2 w-full rounded-md bg-gray-200 px-4 py-2"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button className="w-full rounded-lg bg-dark py-4 text-lg font-bold text-light">
            로그인 하기
          </button>
        </form>
        <p className="mt-2 text-center text-dark/50">
          테스트 아이디: test / 테스트 비밀번호: test
        </p>
      </div>
    </section>
  );
};

const Admin = () => {
  const isLogin = useSelector((state: RootState) => state.ui.isLogin);

  return isLogin === true ? <NewProduct /> : <Login />;
};

export default Admin;
