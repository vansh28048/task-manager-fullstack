interface ToggleSwitchProps {
  value: boolean;
  onToggle?: (val: boolean) => void;
  readOnly?: boolean;
}

function ToggleSwitch({ value, onToggle, readOnly }: ToggleSwitchProps) {
  return (
    <div
      onClick={() => {
        if (!readOnly && onToggle) onToggle(!value);
      }}
      className={`relative w-20 h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center px-1 select-none
      ${value ? "bg-green-500" : "bg-yellow-400"} ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {value ? (
        <>
          <span className="text-white font-semibold text-xs pl-2 pr-1">
            YES
          </span>
          <div className="ml-auto w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300" />
        </>
      ) : (
        <>
          <div className="w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300" />
          <span className="ml-auto text-white font-semibold text-xs pr-2 pl-1">
            NO
          </span>
        </>
      )}
    </div>
  );
}

export default ToggleSwitch;
