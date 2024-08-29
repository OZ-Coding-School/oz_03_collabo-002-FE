import { useEffect, useState } from 'react';
import useAccountStore from '../../store/useAccountStore';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useModalStore } from '../../store/useModal';
import { useUserStore } from '../../store/useUser';

const AccountEditProfile = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const user = useUserStore((state) => state.user);
  const fetchUser = useAccountStore((state) => state.fetchUser);
  const updateUser = useAccountStore((state) => state.updateUser);
  const deleteUser = useAccountStore((state) => state.deleteUser);
  const { showModal } = useModalStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSaveUserinfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    // name과 avatar 필드가 모두 필수임을 명시합니다.
    const updateData: { name: string; avatar: File | string | null } = {
      name: '',
      avatar: null,
    };
  
    // 이름이 비어있지 않은 경우에만 updateData.name을 설정합니다.
    if (name !== '') {
      updateData.name = name;
    }
  
    // 아바타가 있는 경우에만 updateData.avatar을 설정합니다.
    if (avatar) {
      updateData.avatar = avatar;
    }
  
    // updateData에서 유효한 값이 있는 항목만 필터링하여 전달합니다.
    const validUpdateData = {} as { name?: string; avatar?: File | string | null };
    if (updateData.name) {
      validUpdateData.name = updateData.name;
    }
    if (updateData.avatar) {
      validUpdateData.avatar = updateData.avatar;
    }
  
    updateUser(validUpdateData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="px-6">
      <form>
        <label>
          <h3 className="mb-[15px] text-lg font-bold">Name</h3>
          <input
            type="text"
            placeholder={user?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 py-1 px-2 rounded-md"
          />
        </label>
        <label>
          <h3 className="my-[15px] text-lg font-bold">
            Choose a profile Picture
          </h3>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-400 py-1 px-2 rounded-md"
          />
        </label>
        <div className="my-6">
          <Button
            type="submit"
            size="full"
            value="Save"
            onSubmit={handleSaveUserinfo}
          />
        </div>
      </form>
      <hr />
      {showModal ? <Modal /> : null}
      <button onClick={() => deleteUser()} className='py-[15px] text-red font-bold text-sm'>Delete Account</button>
    </div>
  );
};

export default AccountEditProfile;
