# SignUp

# 최신

react-hook-form, zod를 사용하여 submit관리, 불필요한 함수를 없애고 가독성을 높혔습니다.

```.ts


import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSignUp } from '../../api/reactQuery/signUpQuery';
import { useShowSingUpModal } from '../../store/display/displayState';
import { toastWarning } from '../../components/toastr/ToastrConfig';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
const schema = z.object({
  username: z.string(),
  password1: z.string(),
  password2: z.string(),
  email: z.string().email(),
  nickname: z.string(),
});
type SignUpUserData = z.infer<typeof schema>;
const SignupModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUserData>();
  const onSubmit: SubmitHandler<SignUpUserData> = (data) => {
    console.log(data);
    if (!blankCheck(data)) {
      toastWarning('필수 정보를 모두 입력해주세요.');
      return;
    }
    if (data.password1 !== data.password2) {
      return toastWarning('비밀번호가 일치하지 않습니다.');
    } else {
      signUp.mutate(data);
    }
  };
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const { showSignUpModal, setShowSignupModal } = useShowSingUpModal();

  const signUp = useSignUp();
  function blankCheck(data: SignUpUserData) {
    return (
      data.username &&
      data.password1 &&
      data.password2 &&
      data.email &&
      data.nickname
    );
  }

  if (!showSignUpModal) return null;

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };

  return (
    <>
      <button className="btn" onClick={() => setShowSignupModal(true)}>
        회원가입
      </button>

      {showSignUpModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowSignupModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">회원가입</h3>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('username', {})}
                />
              </div>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('password1')}
                />
              </div>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호 확인</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('password2')}
                />
              </div>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">이메일</span>
                </label>
                <input
                  type="email"
                  placeholder="이메일를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('email')}
                />
              </div>
              <div className="form-control w-full flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">닉네임</span>
                </label>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('nickname')}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                >
                  회원가입
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

export default SignupModal;



```

## 이전코드

```.ts
import {
faComment
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toastNotice, toastWarning } from "../toastr/ToastrConfig";
const SignupModal = ({ showModal, setShowModal }: any) => {
const [username, setUsername] = useState("");
const [password1, setPassword1] = useState("");
const [password2, setPassword2] = useState("");
const [email, setEmail] = useState("");
const [nickname, setNickname] = useState("");
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

const signupData = {
username,
password1,
password2,
email,
nickname,
};
const handleSignup: any = async (e: MouseEvent) => {
e.preventDefault();

    if (!passwordCheck()) {
      toastWarning("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!blankCheck()) {
      toastWarning("필수 정보를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/member/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        setShowModal(false); // 회원가입 성공 후 모달 닫기
        toastNotice("회원가입 완료.");
      } else {
        // 서버 에러 처리
        const errorData = await response.json();
        toastWarning("중복된 이름입니다.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }

};

function passwordCheck() {
return password1 === password2;
}

function blankCheck() {
return (
username.trim() &&
password1.trim() &&
password2.trim() &&
email.trim() &&
nickname.trim()
);
}

if (!showModal) return null;

const handleKakaoLogin = () => {
const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;

};

return (
<>
<button className="btn" onClick={() => setShowModal(true)}>
회원가입
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
              <h3 className="font-bold text-3xl text-center mb-4">회원가입</h3>
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
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호 확인</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">이메일</span>
                </label>
                <input
                  type="email"
                  placeholder="이메일를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">닉네임</span>
                </label>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                  onClick={handleSignup}
                >
                  회원가입
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

export default SignupModal;
```

## 이후코드

```.ts
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSignUp } from '../../api/reactQuery/signUpQuery';
import { useShowSingUpModal } from '../../store/display/displayState';
import { toastWarning } from '../../components/toastr/ToastrConfig';
const SignupModal = () => {
  const [username, setUserName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const { showSignUpModal, setShowSignupModal } = useShowSingUpModal();
  const signupData = {
    username,
    password1,
    password2,
    email,
    nickname,
  };
  const signUp = useSignUp(signupData);
  function passwordCheck() {
    return password1 === password2;
  }

  function blankCheck() {
    return (
      username.trim() &&
      password1.trim() &&
      password2.trim() &&
      email.trim() &&
      nickname.trim()
    );
  }

  const handleSignup: any = async (e: MouseEvent) => {
    e.preventDefault();
    if (!blankCheck()) {
      toastWarning('필수 정보를 모두 입력해주세요.');
      return;
    }
    if (!passwordCheck()) {
      toastWarning('비밀번호가 일치하지 않습니다.');
      return;
    }
    signUp.mutate();
  };

  if (!showSignUpModal) return null;

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };

  return (
    <>
      <button className="btn" onClick={() => setShowSignupModal(true)}>
        회원가입
      </button>

      {showSignUpModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowSignupModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">회원가입</h3>
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
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호 확인</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">이메일</span>
                </label>
                <input
                  type="email"
                  placeholder="이메일를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">닉네임</span>
                </label>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={nickname}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                  onClick={handleSignup}
                >
                  회원가입
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

export default SignupModal;

```

signUpQuery.ts

```.ts
import { useMutation } from '@tanstack/react-query';
import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';
import { useShowSingUpModal } from '../../store/display/displayState';
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

export const useSignUp = (signupData: {
  username: string;
  password1: string;
  password2: string;
  email: string;
  nickname: string;
}) => {
  const { setShowSignupModal } = useShowSingUpModal();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/api/member/signup`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        setShowSignupModal(false); // 회원가입 성공 후 모달 닫기 이건 주스탠드에 있는 상태다

        toastNotice('회원가입 완료.');
      } else {
        toastWarning('중복된 이름입니다.');
        return;
      }
      return response;
    },
    onError: (error: Error) => {
      console.error('Signup Error:', error);
    },
  });
};


```
