const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex my-2">
      <div className="form-control">
        <div className="flex flex-row items-center">
          <div className="p-2 text-gray-400"><span className='text-base'>Male</span></div>
          <input type="checkbox" autoComplete="gender" className="checkbox w-6 h-6 text-blue-600 bg-gray-300 checked:bg-gray-300"
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
          />
        </div>
      </div>
      <div className="form-control">
        <div className="flex flex-row items-center">
          <div className="p-2 text-gray-400"><span className='text-base'>Female</span></div>
          <input type="checkbox" autoComplete="gender" className="checkbox w-6 h-6 text-blue-600 bg-gray-300 checked:bg-gray-300"
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
        </div>
      </div>
    </div>
  );
};

export default GenderCheckbox;
