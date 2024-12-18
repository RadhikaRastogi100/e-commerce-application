import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./ProductList.css";
import { fetchProductList, pagination } from "../../api";

const ProductsList: React.FC = () => {
  const [product, setProduct] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showProducts, setShowProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const PRODUCTS_PER_PAGE = 10;

  const displayProducts = useCallback(async (page: number) => {
    const skip = (page - 1) * PRODUCTS_PER_PAGE;
    try {
      setLoading(true);
      const data = await pagination(PRODUCTS_PER_PAGE, skip);
      setProduct(data.products);
      setShowProducts(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    displayProducts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(showProducts / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProductList();
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container lg-3">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only" data-testid="list-loading">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row" data-testid="product-list">
          {product.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              detailed={false}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-end mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination">

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
            </li>

            <li className="page-item disabled">
              <span className="page-link">
                Page {currentPage} of {totalPages}
              </span>
            </li>

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductsList;
