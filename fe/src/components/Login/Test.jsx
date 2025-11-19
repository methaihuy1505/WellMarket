import { LoginModal } from "./Login";
import { RegisterModal } from "./Register";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header"
import ProductGrid from "../Layout/ProductUI";
import { products } from "../Layout/FakeData";
import CreatePostForm from "../Post/UpPost";
export default function Test() {
  return (
    <>
 
    <Header />
     <CreatePostForm/>
    {/* <ProductGrid apiData={products} />

    <button
      onClick={() => LoginModal.show()}
      className="bg-pink-500 text-white px-4 py-2 rounded-lg"
    >
      Mở popup login
    </button>
     <button
      onClick={() => RegisterModal.show()}
      className="bg-pink-500 text-white px-4 py-2 rounded-lg"
    >
      Mở popup đăng ký
    </button> */}
      <Footer />
    </>
  );
}
