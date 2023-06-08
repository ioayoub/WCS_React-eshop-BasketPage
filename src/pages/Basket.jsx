import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];

  useEffect(() => {
    fetch('https://ioayoub.fr/api/mocks/eshop')
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((item) =>
          localProducts.some((product) => product.id === item.id)
        );

        const updatedProducts = filteredProducts.map((item) => {
          const product = localProducts.find((p) => p.id === item.id);
          const totalPrice = product ? product.quantity * item.price : 0;
          return { ...item, totalPrice };
        });

        const totalSum = updatedProducts.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        setProducts(updatedProducts);
        setTotal(totalSum);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    localStorage.removeItem('localProducts');
    //localStorage.clear();
    alert('Paiement effectué avec succès !');
    navigate('/');
  };

  return (
    <div>
      {products && localProducts.length > 0 ? (
        <>
          <h1 className="text-4xl text-center mt-16">Basket page</h1>
          <div className="flex flex-row justify-around">
            <div className="block ml-16 mt-16">
              {products.map((item) => {
                return (
                  <div key={item.id} className="mt-8">
                    <a
                      href={`/product/${item.id}`}
                      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                        src={item.picture}
                        alt=""
                      />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 w-full">
                          {item.name}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex">
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    My Basket
                  </h5>
                </div>

                <div className="flow-root">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    {products.map((item) => (
                      <li
                        key={item.id}
                        className="py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              className="w-16 h-16 rounded-full border border-gray-200"
                              src={item.picture}
                              alt=""
                            />
                            <div className="ml-4 w-full">
                              <p className="font-medium text-gray-800 w-full">
                                {item.name}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {item.totalPrice.toFixed(2)} €
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                    <p className="text-black font-bold text-right pt-16">
                      Total TTC : {total} €
                    </p>
                    <button
                      className="block mx-auto bg-green-300 text-white p-4 mt-16"
                      onClick={handleClick}
                    >
                      Paiement
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center mt-16">Basket is empty</h1>
          <button
            className="btn bg-blue-400 text-white block mx-auto p-4 mt-16"
            onClick={() => navigate('/')}
          >
            Return to homepage
          </button>
        </>
      )}
    </div>
  );
};

export default Basket;
