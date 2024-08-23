import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '../../config/IconData';
import { useEffect, useState } from 'react';

type AccountHeaderProps = {
  headerText: string;
};

const AccountHeader = ({ headerText }: AccountHeaderProps) => {
  const [isDashboard, setIsDashboard] = useState(false);
  const navigate = useNavigate();
  const page = location.href;

  useEffect(() => {
    if (page.includes('/account?page=')) {
      setIsDashboard(false);
    } else {
      setIsDashboard(true);
    }
  }, [page]);

  return (
    <>
      {isDashboard ? (
        <div className="w-full flex items-center py-[15px] px-6">
          <h1 className="text-lg font-extrabold mr-1 ">{headerText}</h1>
        </div>
      ) : (
        <div className="w-full flex items-center py-[15px] px-6">
          <button onClick={() => navigate(-1)} className="pointer">
            <IconArrowLeft className="mr-[15px]" />
          </button>
          <h1 className="text-lg font-extrabold mr-1 ">{headerText}</h1>
        </div>
      )}
    </>
  );
};

export default AccountHeader;
