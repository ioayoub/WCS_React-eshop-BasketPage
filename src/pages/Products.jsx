import { useEffect, useState } from 'react';

import ArticleCard from '../components/Articles/ArticleCard';

const Products = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('https://ioayoub.fr/api/mocks/eshop')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center mt-16">Products page</h1>
      <div className="grid grid-cols-3 gap-20 max-w-screen-xl mx-auto my-20">
        {products &&
          products.map((product) => (
            <ArticleCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              picture={product.picture_resized}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
