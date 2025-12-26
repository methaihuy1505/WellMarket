export const safeArr = (a) => (Array.isArray(a) ? a : []);

export const normalize = (o = {}) => ({
  id: o.id ?? null,
  name: o.name ?? o.fullName ?? o.username ?? "",
  email: o.email ?? "",
  phone: o.phone ?? o.mobile ?? "",
  status: o.status ?? o.state ?? "",
  role: o.role ?? "user",
  createdAt: o.createdAt ?? o.created_at ?? o.created ?? null,
  avatar:
    o.avatar ??
    "/mnt/data/ea3bee50-9964-4c5b-a139-dd78dc24dfb3.png",
  coins: Number(o.coins ?? o.wallet ?? 0),
  ...o,
});

export const fmtDate = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};
