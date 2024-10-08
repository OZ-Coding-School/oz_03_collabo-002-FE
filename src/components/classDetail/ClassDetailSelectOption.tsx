import { IconOptionArw } from '../../config/IconData';

type ClassDetailSelectOptionProps = {
  availableTypes: string[];
  maxPerson: number | null;
  selectedSupportLanguage: string;
  selectedClassType: string;
  setSelectedSupportLanguage: (data: string) => void;
  setSelectedClassType: (data: string) => void;
};

const ClassDetailSelectOption: React.FC<ClassDetailSelectOptionProps> = ({
  availableTypes,
  maxPerson,
  selectedSupportLanguage,
  selectedClassType,
  setSelectedSupportLanguage,
  setSelectedClassType,
}) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSupportLanguage(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassType(e.target.value);
  };

  return (
    <div>
      {/* 언어 선택 드롭다운 */}
      <div className="mt-[22px] relative mx-6">
        <select
          value={selectedSupportLanguage}
          onChange={handleLanguageChange}
          className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
        >
          <option value={''}>
            Supporters Language Type
          </option>
          <option value="Korean">--Korean--</option>
          <option value="English">--English--</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <IconOptionArw />
        </div>
      </div>

      {/* 클래스 타입 선택 드롭다운 */}
      {availableTypes.length > 0 && (
        <div className="mt-[22px] relative mx-6">
          <select
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
            id="classType"
            value={selectedClassType}
            onChange={handleTypeChange}
          >
            <option value={''}>
              Select Class Type
            </option>
            {availableTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>
      )}

      {/* 최대 인원 표시 */}
      <div className="border border-1 border-gray-400 rounded-lg mx-6 mt-[22px] py-[12px] px-[14px] flex justify-between text-gray-400">
        {maxPerson !== null
          ? `Minimum class size ${maxPerson} participants`
          : 'Loading max participants...'}
      </div>
    </div>
  );
};

export default ClassDetailSelectOption;
