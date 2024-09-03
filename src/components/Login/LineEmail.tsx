// import { useForm, SubmitHandler } from 'react-hook-form';

export type LineEmail = {
  email: string;
};

const LineEmail = () => {
  return (
    <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className=" w-100 h-80 flex flex-col items-center border-2 p-4 rounded-lg">
          <div className="text-lg text-center mb-10 mt-4">
            If you log in with a phone number, <br />
            Please enter your email.
          </div>
          <div className=" w-full text-center h-12">
            <span>Input your Email</span>
          </div>
          <div className="flex flex-col h-full justify-center items-center">
            <input
              type="email"
              className="border-b-2 focus:outline-none "
              placeholder="e-mail"
            />
            <button className="mt-6 bg-[#03C75A] text-white w-20 rounded-md h-8">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineEmail;
