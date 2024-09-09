import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ModalProfile from '../common/ModalProfile';
import { useModalOpenCloseStore } from '../../store/useModal';
import Modal from '../common/Modal';

type Props = {
  avatar: string;
  setAvatar: (avatar: string) => void;
  labelStyle: string;
};

const AccountEditPhoto = ({ setAvatar, labelStyle }: Props) => {
  const { showModal } = useModalOpenCloseStore();
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 요소에 대한 참조 관리
  const [originalFileName, setOriginalFileName] = useState<string>(''); // 원본파일 이름 저장
  const [img, setImg] = useState<string>(''); // Crop 된 이미지를 문자열로 저장
  const [imgFile, setImgFile] = useState<File>(); // Crop된 이미지 파일 객제 저장
  const [preview, setPreview] = useState<string | null>(null); // 문자열로 변환된 이미지 미리보기 저장
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (imgFile) {
      //
    }
  }, [imgFile]);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log(file);

      // 예: 5MB로 크기 제한
      if (file && file.size > 5 * 1024 * 1024) {
        alert('파일 크기가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.');
        return;
      }

      if (file) {
        setOriginalFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setIsModalOpen(true);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleCroppedImage = useCallback(
    (imageFile: File) => {
      setImgFile(imageFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
        setAvatar(reader.result as string); // 크롭된 이미지 전달
      };
      console.log('img as string: ', img);
      reader.readAsDataURL(imageFile);
      setIsModalOpen(false);
    },
    [img, setAvatar],
  );

  const memoizedModalProfile = useMemo(
    () =>
      isModalOpen &&
      preview && (
        <ModalProfile
          preview={preview}
          onClose={() => setIsModalOpen(false)}
          onCrop={handleCroppedImage}
          originalFileName={originalFileName}
        />
      ),
    [isModalOpen, preview, handleCroppedImage, originalFileName],
  );

  const handleChange = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="pb-[30px]">
      <label htmlFor="avatar">
        <h3 className={labelStyle}>Profile Picture</h3>
      </label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInput}
      />
      {/* absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  */}
      <button
        className="w-full h-28 rounded-2xl bg-white border-dashed border- border-4"
        onClick={handleChange}
      >
        {img ? (
          <img
            src={img}
            alt="Profile Preview"
            className="w-14 h-14 rounded-full mx-auto"
          />
        ) : (
          'Choose to profile Picture'
        )}
      </button>
      {showModal && <Modal />}
      {memoizedModalProfile}
    </div>
  );
};

export default AccountEditPhoto;
