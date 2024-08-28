import useAccountStore from '../../store/useAccountStore';

const AccountUserInfo = () => {
  const user = useAccountStore((state) => state.user);

  return (
    <div className="w-full h-50 relative flex items-center p-6">
      <img
        src="/images/user-empty.png"
        className="size-14 rounded-full mr-[15px]"
      />
      <div className="font-bold">
        <div className="text-lg">{user ? user?.name : 'Failed to load user.'}</div>
        <div className="text-xs">{user ? user?.email : 'Failed to load user.'}</div>
      </div>
    </div>
  );
};

export default AccountUserInfo;
