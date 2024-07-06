import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Jewelry, Review } from "../../../types";
import { getJewelryById } from "../../../api/jewelry";
import { InputNumber, Button } from "antd";
import "./JewelryDetail.scss";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const JewelryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [jewelryItem, setJewelryItem] = useState<Jewelry | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lastReview, setLastReview] = useState<Review | null>(null);
  const [starRating, setStarRating] = useState<JSX.Element[]>([]);
  const [quantitySelected, setQuantitySelected] = useState<number>(1);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchJewelryItem = async () => {
      try {
        const data = await getJewelryById(Number(id));
        setJewelryItem(data);
        setMaxQuantity(data.quantity); // Set maximum quantity from jewelry item
        if (data.reviews && data.reviews.length > 0) {
          setLastReview(data.reviews[data.reviews.length - 1]);
          generateStarRating(data.reviews[data.reviews.length - 1].rating);
        } else {
          setLastReview(null);
          generateStarRating(0); // Default rating if no reviews
        }
      } catch (error) {
        console.error("Error fetching jewelry item:", error);
      }
    };

    fetchJewelryItem();
  }, [id]);

  const handleThumbnailClick = (index: number) => {
    setActivePhotoIndex(index);
  };

  const generateStarRating = (rating: number) => {
    const stars = [];
    const totalStars = 5;
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(<StarFilled key={i} style={{ fontSize: "18px" }} />);
      } else {
        stars.push(<StarOutlined key={i} style={{ fontSize: "18px" }} />);
      }
    }
    setStarRating(stars);
  };

  const handleQuantityChange = (value: number | undefined | string | null) => {
    if (value !== undefined && value !== null) {
      setQuantitySelected(
        typeof value === "string" ? parseInt(value, 10) : value
      );
    }
  };

  const handleAddToCart = () => {
    // Add logic to add selected quantity to cart
    console.log("Adding to cart:", quantitySelected);
  };

  if (!jewelryItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="jewelry-detail">
      <div className="container">
        <div className="jewelry-detail-wrapper">
          <div className="jewelry-images">
            <div className="thumbnail-container">
              {jewelryItem.images.map((image, index) => (
                <img
                  key={index}
                  src={image.image}
                  alt={jewelryItem.title}
                  width={120}
                  height={120}
                  className={`thumbnail ${
                    activePhotoIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
            <img
              src={jewelryItem.images[activePhotoIndex]?.image}
              alt={jewelryItem.title}
              width={540}
              height={600}
            />
          </div>
          <div className="jewelry-info">
            <h1 className="jewelry-info-title">{jewelryItem.title}</h1>
            <p className="jewelry-info-price">$ {jewelryItem.price}</p>


            {starRating.length > 0 && (
              <div className="star-rating">
                {starRating.map((star, index) => (
                  <span key={index}>{star}</span>
                ))}
              </div>
            )}

            {lastReview && (
              <div className="last-review">
                <p>{lastReview.comment}</p>
              </div>
            )}

            <div className="add-cart">
              <InputNumber
                min={1}
                max={maxQuantity}
                defaultValue={1}
                value={quantitySelected}
                onChange={handleQuantityChange}
              />
              <Button type="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryDetail;
