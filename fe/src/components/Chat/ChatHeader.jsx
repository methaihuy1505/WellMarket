// src/components/chat/ChatHeader.jsx
import { useEffect, useState, useRef } from "react";
import axios from "../../utils/axios";
import { productsMock } from "./Mock/products.mock";

export default function ChatHeader({ conversation, onToggleSidebar }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, [conversation.id]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(
        `/users/${conversation.userId}/products`
      );

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.data;

      setProducts(list);
      setSelectedProduct(list[0] || null);
    } catch {
      setProducts(productsMock);
      setSelectedProduct(productsMock[0]);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white m-2">
        {/* USER */}
        <div className="flex  border-t-2 border-l-2 border-r-2 rounded-t-lg border-pink-100 items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={conversation.avatar}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-semibold text-sm">
                {conversation.name}
              </div>
              <div className="text-xs text-green-500">
                {conversation.online ? "Đang hoạt động" : "Offline"}
              </div>
            </div>
          </div>

          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ☰
          </button>
        </div>

        {/* PRODUCT DROPDOWN */}
        {selectedProduct && (
          <div
            className="bg-gray-50 border-t relative"
            ref={dropdownRef}
          >
            {/* SELECTED */}
            <div
              tabIndex={0}
              onClick={() => setOpen(o => !o)}
              className={`
        group
        flex gap-3 cursor-pointer
        border-b-2 border-l-2 border-r-2
        rounded-b-lg border-pink-100
        p-2 bg-white
        focus:outline-none
        focus:ring-2 focus:ring-pink-400
        transition
      `}
            >
              <img
                src={selectedProduct.image}
                className="w-12 h-12 rounded object-cover"
              />

              <div className="flex-1">
                <div className="text-sm font-medium">
                  {selectedProduct.title}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedProduct.price.toLocaleString()} đ
                  <span className=" text-gray-400">
                    {" "}
                    · {selectedProduct.status}
                  </span>
                </div>
              </div>

              {/* ICON */}
              <div
                className={` text-xl pr-2
          self-center text-gray-400
          transition-transform duration-200
          ${open ? "rotate-180 text-pink-500" : ""}
          group-focus:text-pink-500
        `}
              >
                ▾
              </div>
            </div>

            {/* DROPDOWN LIST */}
            {open && (
              <div className="absolute left-1 right-1 top-full  bg-white border rounded shadow max-h-64 overflow-y-auto z-50">
                {products.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setOpen(false);
                    }}
                    className={`flex gap-3 p-2 cursor-pointer hover:bg-gray-100 ${p.id === selectedProduct.id
                        ? "bg-gray-50"
                        : ""
                      }`}
                  >
                    <img
                      src={p.image}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {p.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {p.price.toLocaleString()} đ
                        <span className="text-gray-400">
                          {" "}
                          · {p.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {products.length === 0 && (
                  <div className="p-3 text-sm text-gray-400">
                    Không có sản phẩm
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>

  );
}
