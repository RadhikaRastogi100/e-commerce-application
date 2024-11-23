import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { fetchProductById } from "../../api";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [viewDetail, setViewDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getProductDetails = useCallback(async () => {
    try {
      if (productId) {
        setLoading(true);
        const response = await fetchProductById(productId);
        setViewDetail(response);
      }
    } catch (error) {
      console.log("Product Detail is not available");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <div className="container"  data-testid="product-details"> 
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only" data-testid="detail-loading">Loading...</span>
            </div>
          </div>
        ) : (
          <ProductCard
            thumbnail={viewDetail?.thumbnail}
            id={viewDetail?.id}
            title={viewDetail?.title}
            price={viewDetail?.price}
            images={viewDetail?.images?.[0]}
            desc={viewDetail?.description}
            brand={viewDetail?.brand}
            category={viewDetail?.category}
            discount={viewDetail?.discount}
            rating={viewDetail?.rating}
            detailed={true}
          />
        )}
      </div>
    </>
  );
};

export default ProductDetails;
