import { useState } from 'react';

type Props = {};

const AccountEditProfile = (props: Props) => {
  const [userName, setUserName] = useState('');

  return (
    <div>
      <h1>기본정보</h1>
      <div>
        <p>
          <strong>예약자 이름</strong>
          <span>User Name</span>
        </p>
        <button>detail</button>
      </div>
      <div>
        <strong>연결된 계정</strong>
        <span>카카오톡 계정 연결중</span>
      </div>
      아바타 편집
    </div>
  );
};

export default AccountEditProfile;
