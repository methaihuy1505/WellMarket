// components/register/PasswordConditions.jsx
export default function PasswordConditions({ conditions }) {
  return (
    <ul className="mt-2 text-sm">
      <Condition ok={conditions.length} text="Độ dài từ 8–30 ký tự" />
      <Condition ok={conditions.uppercase} text="Có ít nhất một chữ hoa (A–Z)" />
      <Condition ok={conditions.lowercase} text="Có ít nhất một chữ thường (a–z)" />
      <Condition ok={conditions.number} text="Có ít nhất một chữ số (0–9)" />
      <Condition ok={conditions.special} text="Có ít nhất một ký tự đặc biệt" />
    </ul>
  );
}

function Condition({ ok, text }) {
  return (
    <li className={ok ? "text-green-600" : "text-red-600"}>
      {ok ? "✅" : "❌"} {text}
    </li>
  );
}
