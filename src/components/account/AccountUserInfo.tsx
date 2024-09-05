import useAccountStore from '../../store/useAccountStore';
import { useUserStore } from '../../store/useUser';

const AccountUserInfo = () => {
  const user = useUserStore((state) => state.user);
  const logout = useAccountStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-50 relative flex items-center justify-between p-6">
      <div className="flex">
        <img
          src={user?.profile_image || '/images/user-empty.png'}
          className="size-14 rounded-full mr-[15px]"
        />
        <div className="font-bold">
          <div className="text-lg">
            {user ? user?.name : 'Failed to load user.'}
          </div>
          <div className="text-xs">
            {user ? user?.email : 'Failed to load user.'}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="text-sm border border-gray px-3 py-1 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountUserInfo;
