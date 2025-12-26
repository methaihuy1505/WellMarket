// components/register/PasswordInput.jsx
import PasswordConditions from "./PasswordConditions";

export default function PasswordInput({
  value,
  onChange,
  error,
  conditions,
  showConditions,
  setShowConditions,
}) {
  return (
    <>
      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder="Mật khẩu"
        onFocus={() => setShowConditions(true)}
        onBlur={() => setShowConditions(false)}
        className={`w-full border rounded-lg p-2 focus:ring mb-1 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "focus:ring-pink-200 focus:shadow-lg focus:shadow-pink-200"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}
      {showConditions && <PasswordConditions conditions={conditions} />}
    </>
  );
}
