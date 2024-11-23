import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./ProductCard.css";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  desc?: string;
  brand?: string;
  category?: string;
  discount?: string;
  rating?: string;
  images?: string;
  detailed: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  thumbnail,
  desc,
  brand,
  category,
  discount,
  rating,
  images,
  detailed,
}) => {

  return (
    <div className={detailed ? "card mx-auto w-50 mb-3" : "col-md-3 col-lg-3 mb-3"}>
      <div className="card product-detail">
        {detailed ? (
          <>
            <img
              src={images && images}
              alt={title}
              className="card-img-top product-image"
            />
            <div className="card-body">
              <h3
                className="product-heading"
                style={{ fontSize: "20px", marginTop: "8px" }}
              >
                {title}
              </h3>
              <div className="row">
                <div className="col">Rating:</div>
                <div className="col">{rating}</div>
              </div>
              <div className="row">
                <div className="col">Price:</div>
                <div className="col">{`$${price}`}</div>
              </div>
              {desc && (
                <div className="row">
                  <div className="col font-weight-bold">Description:</div>
                  <div className="col">{desc}</div>
                </div>
              )}
              {brand && (
                <div className="row">
                  <div className="col">Brand:</div>
                  <div className="col">{brand}</div>
                </div>
              )}
              {category && (
                <div className="row">
                  <div className="col">Category:</div>
                  <div className="col">{category}</div>
                </div>
              )}
              {discount && (
                <div className="row">
                  <div className="col">Discount:</div>
                  <div className="col">{discount}%</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to={`/products/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card-body">
              <img
                src={thumbnail}
                alt={title}
                className="card-img-top"
                style={{ objectFit: "cover" }}
              />
              <h3 style={{ fontSize: "14px", marginTop: "8px" }}>{title}</h3>
              <p>${price.toFixed(2)}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
