
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ProductItem from './ProductItem';
import ProductSkeleton from './ProductSkeleton';
import { StoreDataContext } from '../context/StoreDataContext';

const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          {t('productList.title')}
        </h2>
        <div role="list" className="divide-y divide-gray-200">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      </section>
    );
  }

  const { products } = context;

  return (
    <section aria-labelledby="cart-heading">
      <h2 id="cart-heading" className="sr-only">
        {t('productList.title')}
      </h2>
      <ul role="list" className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
