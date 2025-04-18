import { Icon } from "@iconify/react";

const SerarchInput = () => {
  return (
    <div className="flex flex-row justify-between gap-3 border-b border-y-gray-600 pb-5 mb-5">
      <input
        type="text"
        className="input input-neutral rounded-full"
        placeholder="Search"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <Icon
          icon="material-symbols:search"
          className="text-white text-2xl w-10"
        />
      </button>
    </div>
  );
};

export default SerarchInput;
