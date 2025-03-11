import React, { useState, useEffect } from "react";
import { useUserContext } from "../Register/UserContext";
import { ToastContainer, toast } from "react-toastify";
import CartProduct from "./CartProduct";
import Card from "./Card";
import "./Products.css";
import data from "./productItemsData";
import SearchBar from "../../Common/SearchBar/SearchBar";
import axios from "axios";

import Button from "../../Base/Button";

export default function Products() {
  const [products] = useState(data);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUserContext();
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [isShopLoading, setIsShopLoading] = useState(false);
  const [isEmptyLoading, setIsEmptyLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageArray = [12, 9];

  const notify = (message, type = "info") => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addProductToCart = (productId) => {
    setShoppingCart((prevCart) => {
      const productIndex = prevCart.findIndex(
        (product) => product.id === productId
      );

      let updatedCart;

      if (productIndex !== -1) {
        updatedCart = prevCart.map((product, index) =>
          index === productIndex
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        const mainProduct = products.find(
          (product) => product.id === productId
        );
        if (!mainProduct) return prevCart;

        updatedCart = [...prevCart, { ...mainProduct, quantity: 1 }];
      }

      return updatedCart;
    });

    const isProductInCart = shoppingCart.some(
      (product) => product.id === productId
    );

    if (isProductInCart) {
      notify("Quantity updated in cart!", "success");
    } else {
      notify("Product added to cart!", "success");
    }
  };

  const emptyShoppingCart = () => {
    setIsEmptyLoading(true);
    setTimeout(() => {
      setShoppingCart([]);
      setIsEmptyLoading(false);
    }, 1000);
  };

  const removeProductFromCart = (productId) => {
    setShoppingCart(shoppingCart.filter((product) => product.id !== productId));
  };

  const shoppingHandler = async (event, products) => {
    event.preventDefault();
    if (products.length === 0) {
      notify(
        "Your cart is empty. Please add products before placing an order.",
        "error"
      );
      return;
    }

    setIsShopLoading(true);
    const filteredProducts = products.map((product) => ({
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    }));

    const userInfo = { userName: user, filteredProducts };

    try {
      const response = await axios.post(
        "https://vapornestshop-default-rtdb.firebaseio.com/orders.json",
        userInfo
      );

      if (response.status === 200) {
        notify(
          "Your order has been placed. Our team will contact you soon.",
          "success"
        );
        emptyShoppingCart();
      } else {
        notify("Failed to place the order. Please try again.", "error");
      }
    } catch (error) {
      notify("An error occurred while placing your order.", "error");
    } finally {
      setIsShopLoading(false);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setShoppingCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return shoppingCart.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.quantity || 1),
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  const filteredProducts = products
    .filter((product) => {
      if (filter === "all") return true;
      if (filter === "pod") return product.category === "pod";
      if (filter === "vape") return product.category === "vape";
      if (filter === "under30") return product.price < 30;
      return true;
    })
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = itemsPerPageArray.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const startIndex = itemsPerPageArray
    .slice(0, currentPage - 1)
    .reduce((acc, num) => acc + num, 0);
  const endIndex = startIndex + itemsPerPageArray[currentPage - 1];

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const itemsPerPage = itemsPerPageArray[0] || 9;
  const filteredTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < filteredTotalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="allProduct">
      <div className="find-product">
        <span className="searchbar">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={(term) => {
              setSearchTerm(term);
              setCurrentPage(1); // بازنشانی صفحه به ۱
            }}
          />
        </span>
        <select
          className="filter-button"
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // بازنشانی صفحه به ۱
          }}
          value={filter}
        >
          <option value="all">Filter</option>
          <option value="pod">Pods</option>
          <option value="vape">Vapes</option>
          <option value="under30">Below 30$</option>
        </select>
      </div>
      <div className="grid-container">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            onAddProduct={addProductToCart}
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>
          Page {currentPage} of {filteredTotalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= filteredTotalPages}
        >
          &gt;
        </button>
      </div>

      <section className="container content-section">
        <h2 className="section-header">SHOPPING CART</h2>
        <div className="cart-row">
          <span className="cart-item cart-header cart-column">ITEM</span>
          <span className="cart-price cart-header cart-column">PRICE</span>
          <span className="cart-quantity cart-header cart-column">
            Quantity
          </span>
          <span className="cart-quantity cart-header cart-column">Actions</span>
        </div>

        <div className="cart-items">
          {shoppingCart.length > 0 ? (
            shoppingCart.map((product) => (
              <CartProduct
                key={product.id}
                {...product}
                onRemove={removeProductFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          ) : (
            <p className="empty-cart-message">Your shopping cart is empty.</p>
          )}
        </div>
      </section>

      <div className="buttons">
        <button
          className="btn-shop"
          type="button"
          onClick={(e) => shoppingHandler(e, shoppingCart)}
          disabled={isShopLoading}
        >
          {isShopLoading ? "Processing..." : "Shop"}
        </button>
        <button className="btn-total" type="button">
          Total Price: ${totalPrice.toFixed(2)}
        </button>
        <Button
          baseVariant="empty"
          onClick={emptyShoppingCart}
          disabled={isEmptyLoading}
        >
          {isEmptyLoading ? "Clearing..." : "Empty Cart"}
        </Button>
      </div>

      <ToastContainer />

      <button
        className="scroll-to-cart-btn"
        onClick={() => {
          document
            .querySelector(".content-section")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        Go to Cart
      </button>
    </div>
  );
}
