// components/register/TextInput.jsx
export default function TextInput({
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  ...props
}) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-lg p-2 focus:ring mb-1 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "focus:ring-pink-200 focus:shadow-lg focus:shadow-pink-200"
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}
    </>
  );
}
