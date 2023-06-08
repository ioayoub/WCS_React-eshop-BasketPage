import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Star from '../components/Articles/Star';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [variantQuantity, setVariantQuantity] = useState(1);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetch('https://ioayoub.fr/api/mocks/eshop')
      .then((res) => res.json())
      .then((data) => {
        const productData = data.find((item) => item.id === parseInt(id));

        if (productData) {
          setProduct(productData);
        } else {
          return navigate('/no-match');
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (qty) => {
    const localProducts =
      JSON.parse(localStorage.getItem('localProducts')) || [];

    const productIndex = localProducts.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      localProducts[productIndex].quantity =
        Number(localProducts[productIndex].quantity) + Number(qty);
    } else {
      localProducts.push({ id: product.id, quantity: Number(qty) });
    }
    localStorage.setItem('localProducts', JSON.stringify(localProducts));
  };

  return (
    <div>
      {product && (
        <div className="mx-20 my-10">
          <div className="lg:flex -mx-6">
            <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
              <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
                <img
                  className="object-cover max-h-96 w-full"
                  src={product.picture}
                  alt={product.name}
                  title={product.name}
                />
              </div>
            </div>
            <div className="px-6 md:py-3 lg:w-1/2">
              <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
                {product.name}
              </h1>
              <div className="mb-6">
                <p className="font-semibold text-2xl text-slategray">
                  {product.price} €
                </p>
              </div>
              <div className="mb-6">
                <p className="leading-loose text-lightgray">
                  {product.description}
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                  htmlFor="quantity"
                >
                  Rating
                </label>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => {
                    const value = i + 1;

                    if (value <= product.rating) {
                      return <Star key={value} color="gold" />;
                    }

                    return <Star key={value} color="grey" />;
                  })}
                </div>
              </div>
              <div className="md:flex md:flex-wrap -mx-3">
                <div className="md:w-1/4 px-3 mb-6">
                  <label
                    className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <div className="relative">
                    <select
                      id="quantity"
                      name="quantity"
                      value={variantQuantity}
                      className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                      onChange={(e) => setVariantQuantity(e.target.value)}
                    >
                      {Array.from({ length: 5 }, (_, i) => {
                        const value = i + 1;

                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <button
                className="bg-indigo-600 hover:bg-gray-700 px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
                onClick={() => addToCart(variantQuantity)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
