# LoginModal

# 최신

react-hook-form, zod를 사용하여 submit관리, 불필요한 함수를 없애고 가독성을 높혔습니다.

```.ts

import React from 'react';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useShowLoginModal } from '../../store/display/displayState';
import { useLogin } from '../../api/reactQuery/loginQuery';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({
  username: z.string(),
  password: z.string(),
});
type LoginUserData = z.infer<typeof schema>;
const LoginModal = () => {
  const login = useLogin();
  const { register, handleSubmit } = useForm<LoginUserData>();
  const onSubmit: SubmitHandler<LoginUserData> = (data) => login.mutate(data);
  const { showLoginModal, setShowLoginModal } = useShowLoginModal();
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  // if (!showModal) return null;
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;
    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };
  return (
    <>
      <button className="btn" onClick={() => setShowLoginModal(true)}>
        로그인
      </button>

      {showLoginModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowLoginModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">로그인</h3>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('username', { required: true })}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('password', { required: true })}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                >
                  로그인
                </button>
              </div>
              <div className="modal-action flex justify-center w-full">
                <button
                  type="button"
                  className="btn btn-warning w-full max-w-xs"
                  onClick={handleKakaoLogin}
                >
                  <FontAwesomeIcon icon={faComment} />
                  카카오 로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;




```

아래 코드는 기존에 있던 팀프로젝트 코드입니다
아래의 코드에 reactQuery와 zustand를 적용하여 가독성을 높히고 120줄이던 코드를 90줄로 줄였습니다.

```.ts
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAuth } from '../../delete/AuthContext';
import { toastNotice, toastWarning } from '../toastr/ToastrConfig';

const LoginModal = ({ showModal, setShowModal }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const { login, logout } = useAuth() as any;
  const signupData = {
    username,
    password,
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/member/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        const res = await response.json(); // 응답이 성공적인 경우에만 JSON 파싱
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('nickname', res.data.nickname);
        localStorage.setItem('isLogin', 'true');

        login();
        setShowModal(false); // 로그인 성공 후 모달 닫기
        console.log('로그인');
        toastNotice('로그인 완료.');
      } else {
        // 서버 에러 처리
        const errorData = await response.json();
        toastWarning('존재하지 않는 회원입니다.');
        logout();
      }
    } catch (error) {
      console.error('login Error:', error);
      logout();
    }
  };

  if (!showModal) return null;
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };
  return (
    <>
      <button className="btn" onClick={() => setShowModal(true)}>
        로그인
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">로그인</h3>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                  onClick={handleLogin}
                >
                  로그인
                </button>
              </div>
              <div className="modal-action flex justify-center w-full">
                <button
                  type="button"
                  className="btn btn-warning w-full max-w-xs"
                  onClick={handleKakaoLogin}
                >
                  <FontAwesomeIcon icon={faComment} />
                  카카오 로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};


export default LoginModal;
```

## 바뀐코드

기존에 있던ContextApi 코드를 가져와 TypeScript를 적용하고 reactQuery와 zustand로 옮겨주었습니다.

```.ts
//utils/zustand/auth/loginState.ts
import { create } from 'zustand';

type LoginStat = {
  loginState: boolean;
  setIsLogin: () => void;
  setIsLogout: () => void;
};
//로그인 상태, 로그아웃 상태
export const useLoginState = create<LoginStat>()((set) => ({
  loginState: false,
  setIsLogin: () => set({ loginState: true }),
  setIsLogout: () => set({ loginState: false }),
}));

```

```.ts
//utils/zustand/display/displayState.ts
import { create } from 'zustand';

type LoginModalDisplay = {
  showModal: boolean;
  setShowModal: (toggle: boolean) => void;
};

export const useShowLoginModal = create<LoginModalDisplay>()((set) => ({
  showModal: false,
  setShowModal: (toggle) => {
    set(() => ({
      showModal: toggle,
    }));
  },
}));

```

```.ts
//utils/reactQuery/loginQuery.ts
import { useMutation } from '@tanstack/react-query';
import { useShowLoginModal } from '../../store/display/displayState';
import { useLoginState } from '../../store/auth/loginState';
import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

//로그인

export const useLogin = (signupData: {
  username: string;
  password: string;
}) => {
  const { setIsLogin } = useLoginState();
  const { setShowLoginModal } = useShowLoginModal();
  const logout = useLogout();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/api/member/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(signupData),
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.ok) {
        setIsLogin();
        setShowLoginModal(false); // 로그인 성공 후 모달 닫기
        console.log('로그인');
        toastNotice('로그인 완료.');
      } else {
        // 서버 에러 처리

        toastWarning('존재하지 않는 회원입니다.');

        //context의 로그아웃 로직 구현해야댐
      }
    },
    onError: (error: Error) => {
      console.error('login Error:', error);

      logout.mutate();
    },
  });
};

export const useLogout = () => {
  const { setIsLogout } = useLoginState();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/api/member/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.json();
    },
    onSuccess: () => {
      // 로그아웃 성공 시 처리할 작업 수행
      localStorage.removeItem('username');
      localStorage.removeItem('nickname');
      localStorage.removeItem('isLogin');
      setIsLogout();

      window.location.href = `/`;
    },
    onError: (error) => {
      // 로그아웃 실패 시 처리할 작업 수행
      console.error('로그아웃 에러:', error.message);
    },
  });
};

```

LoginModal

```.ts
import React from 'react';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useShowLoginModal } from '../../store/display/displayState';
import { useLogin } from '../../api/reactQuery/loginQuery';
const LoginModal = () => {
  const { showLoginModal, setShowLoginModal } = useShowLoginModal();
  const [username, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const login = useLogin({ username, password });
  const handleLogin = async (e: any) => {
    e.preventDefault();

    login.mutate();
  };

  // if (!showModal) return null;
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };
  return (
    <>
      <button className="btn" onClick={() => setShowLoginModal(true)}>
        로그인
      </button>

      {showLoginModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowLoginModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">로그인</h3>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                  onClick={handleLogin}
                >
                  로그인
                </button>
              </div>
              <div className="modal-action flex justify-center w-full">
                <button
                  type="button"
                  className="btn btn-warning w-full max-w-xs"
                  onClick={handleKakaoLogin}
                >
                  <FontAwesomeIcon icon={faComment} />
                  카카오 로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

```
