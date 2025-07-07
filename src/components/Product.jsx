import { useState } from "react";
import {
  FaFacebook,
  FaSquareInstagram,
  FaTwitter,
  FaSquareThreads,
} from "react-icons/fa6";
import { FaPinterest, FaBars, FaTimes } from "react-icons/fa";
import img from "../images/img.webp";
import img2 from "../images/img2.webp";
import { Link } from "react-router-dom";

const Product = () => {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="w-full min-h-screen bg-white px-4 py-4">
        {/* Navbar */}
        <nav className="flex justify-between items-center relative flex-wrap md:flex-nowrap">
          <h1 className="font-mono font-bold text-2xl cursor-pointer">
            FLAVO.
          </h1>

          {/* Hamburger Icon */}
          <div
            className="md:hidden text-2xl cursor-pointer ml-auto"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Nav Links */}
          <ul
            className={`w-full md:w-auto md:flex gap-6 font-serif text-lg px-4 py-4 md:p-0 transition-all duration-300 ease-in-out z-10 bg-white md:bg-transparent shadow-md md:shadow-none absolute md:static top-16 left-0 ${
              isOpen ? "flex flex-col" : "hidden md:flex"
            }`}
          >
            <li className="cursor-pointer hover:text-orange-500">Home</li>
            <li className="cursor-pointer hover:text-orange-500">About</li>
            <li className="cursor-pointer hover:text-orange-500">Recipes</li>
            <li className="cursor-pointer hover:text-orange-500">Blog</li>
            <li className="cursor-pointer hover:text-orange-500">Contact</li>
          </ul>
        </nav>

        {/* Hero Section */}
        <div className="px-4 my-6">
          <div className="bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center h-auto">
            <div className="p-10 md:w-2/4">
              <h1 className="text-5xl md:text-7xl font-sans font-bold">
                Adventure
              </h1>
              <h1 className="text-5xl md:text-7xl font-sans font-bold mt-2">
                Of{" "}
                <span className="text-orange-500 text-opacity-90">
                  Delicious
                </span>
              </h1>
              <p className="my-4 text-base md:text-lg">
                Unlock a world of diverse culinary recipes and effortlessly
                unleash your inner chef with FLAVO, your ultimate guide to
                delicious cooking made simple.
              </p>
              <Link to="/search">
                <button className="bg-black text-white px-6 py-3 font-serif rounded-lg my-4 cursor-pointer">
                  Explore Recipe
                </button>
              </Link>
            </div>
            <div className="p-6">
              <img
                src={img}
                alt="Delicious meal"
                loading="lazy"
                className="h-[300px] md:h-[500px]"
              />
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="my-8 bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 p-6">
          <div className="md:w-1/4">
            <h2 className="font-bold text-xl mb-2">User-Centered</h2>
            <p>
              Your feedback shapes our platform ensuring a seamless and
              satisfying culinary journey.
            </p>
          </div>

          <div className="md:w-1/4">
            <h2 className="font-bold text-xl mb-2">Diverse Recipes</h2>
            <p>
              We celebrate diverse recipes from around the world inspiring your
              meals today.
            </p>
          </div>

          <div className="md:w-1/4">
            <h2 className="font-bold text-xl mb-2">Fun Community</h2>
            <p>
              We foster a vibrant foodie community where joy comes with sharing
              recipes with us.
            </p>
          </div>

          <div className="md:w-1/4">
            <img
              src={img2}
              alt="food"
              loading="lazy"
              className="rounded-xl shadow-lg w-full h-[180px] object-cover"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 my-12 md:my-20 flex flex-col justify-center items-center text-center">
          <h1 className="mb-2 text-4xl md:text-6xl font-bold font-serif">
            Become a true{" "}
            <span className="text-orange-500 text-opacity-90">chef</span>
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold font-serif">
            with our recipes.
          </h1>
          <p className="mt-7 text-lg md:text-2xl text-gray-500 font-serif max-w-2xl">
            We are home to a variety of recipes{" "}
            <br className="hidden md:block" />
            from around the world for you to learn.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        <div className="flex justify-center gap-6 mb-4 text-2xl opacity-70">
          <FaFacebook />
          <FaSquareInstagram />
          <FaTwitter />
          <FaSquareThreads />
          <FaPinterest />
        </div>
        <p className="text-sm opacity-50">
          © {currentYear} FLAVO. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Product;
