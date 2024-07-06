import "./Shop.scss";
import { Jewelry } from "../../types";
import { getAllJewelry } from "../../api/jewelry";
import React, { useEffect, useState } from "react";
import { Input, Select, Slider, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Link } from "react-router-dom";

const Shop = () => {
  const [jewelryItems, setJewelryItems] = useState<Jewelry[]>([]);
  const [filteredJewelryItems, setFilteredJewelryItems] = useState<Jewelry[]>(
    []
  );
  const [priceRange, setPriceRange] = useState<[number, number] | number[]>([
    0, 50000,
  ]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  useEffect(() => {
    const fetchJewelryItems = async () => {
      try {
        const data = await getAllJewelry();
        setJewelryItems(data);
        setFilteredJewelryItems(data);
      } catch (error) {
        console.error("Error fetching jewelry items:", error);
      }
    };

    fetchJewelryItems();
  }, []);

  useEffect(() => {
    const filteredItems = jewelryItems.filter(
      (item) =>
        item.price >= priceRange[0] &&
        item.price <= priceRange[1] &&
        (!showInStockOnly || item.quantity > 0)
    );
    setFilteredJewelryItems(filteredItems);
  }, [priceRange, jewelryItems, showInStockOnly]);

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): string => {
    const discountedPrice = price * (1 - discount / 100);
    return discountedPrice.toFixed(2);
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setPriceRange([0, value]);
    } else {
      setPriceRange(value);
    }
  };

  const handleInStockChange = (e: CheckboxChangeEvent) => {
    setShowInStockOnly(e.target.checked);
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="shop-wrapper">
          <div className="shop-title">
            <h1>Shop The Latest</h1>
          </div>
          <div className="shop-main">
            <div className="shop-filter">
              <Input placeholder="Search..." />

              <Select placeholder="Shop By" />
              <Select placeholder="Sort By" />
              <Slider
                range={{ draggableTrack: true }}
                defaultValue={[0, 2000]}
                max={2000}
                onChange={handlePriceRangeChange}
              />

              <div className="shop-filter-checkbox">
                <Checkbox>On sale</Checkbox>
                <Checkbox onChange={handleInStockChange}>In stock</Checkbox>
              </div>
            </div>
            <div className="shop-content">
              {filteredJewelryItems.map((item) => (
                <div key={item.id} className="jewelry-item">
                  <Link to={`/jewelry/${item.id}`}>
                    <div className="image-wrapper">
                      <img
                        src={item.images[0]?.image}
                        alt={item.title}
                        width={"300px"}
                        height={"300px"}
                      />
                    </div>
                    <div className="jewelry-item-info">
                      <h3>{item.title}</h3>
                      {item.quantity === 0 ? (
                        <p className="price">Sold out</p>
                      ) : item.discount > 0 ? (
                        <>
                          <p className="price">
                            $
                            {calculateDiscountedPrice(
                              item.price,
                              item.discount
                            )}
                          </p>
                          <span className="discount">- %{item.discount} </span>
                        </>
                      ) : (
                        <p className="price">${item.price}</p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
