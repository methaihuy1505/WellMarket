import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductGrid from "../components/Layout/ProductGrid";
import { products } from "../components/Layout/FakeData";
export default function HomePage() {
  return (
    <>
      <Header />
      <ProductGrid apiData={products} />
      <Footer />
    </>
  );
}
