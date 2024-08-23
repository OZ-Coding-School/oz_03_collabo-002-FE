import { useEffect, useState } from 'react';
import useAccountStore from '../../store/useAccountStore';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useModalStore } from '../../store/useModal';

const AccountEditProfile = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<File | string | null>(null);
  const user = useAccountStore((state) => state.user);
  const fetchUser = useAccountStore((state) => state.fetchUser);
  const updateUser = useAccountStore((state) => state.updateUser);
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

    const updateData: Partial<{ name: string; avatar: File | string | null }> =
      {};

    if (name !== '') {
      updateData.name = name;
    }

    if (avatar !== null) {
      updateData.avatar = avatar;
    }

    updateUser(updateData);
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
      {showModal ? <Modal /> : null}
    </div>
  );
};

export default AccountEditProfile;
