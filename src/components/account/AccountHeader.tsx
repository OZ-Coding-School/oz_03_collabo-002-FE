type AccountHeaderProps = {
  headerText: string;
};

const AccountHeader = ({ headerText }: AccountHeaderProps) => {

  return (
    <>
      <div className="absolute top-0 z-40 flex justify-center py-[15px] px-6 left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-extrabold mr-1 ">{headerText}</h1>
        </div>
    </>
  );
};

export default AccountHeader;
