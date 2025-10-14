import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useStoreData} from '../context/StoreDataContext';
import {REMOVE_FROM_CART, UPDATE_QUANTITY} from '../state/actions';
import type {Product} from '../types';

interface ProductItemProps {
  product: Product;
}

const DEBOUNCE_DELAY = 300;
const MIN_QUANTITY = 1;

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const {i18n,t } = useTranslation();
  const { dispatch } = useStoreData();
  const [inputValue, setInputValue] = useState(product.quantity.toString());
  const debounceTimeout = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setInputValue(product.quantity.toString());
  }, [product.quantity]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      // analytics.track('Product Quantity Changed', {
      //   productId: product.id,
      //   quantity: product.quantity
      // });
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [product.quantity, product.id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity >= MIN_QUANTITY && newQuantity <= product.availableQuantity) {
      dispatch({ type: UPDATE_QUANTITY, payload: { productId: product.id, quantity: newQuantity } });
    }
  };

  const handleBlur = () => {
    let correctedQuantity = parseInt(inputValue, 10);

    if (isNaN(correctedQuantity)) {
      correctedQuantity = MIN_QUANTITY;
    }
    if (correctedQuantity < MIN_QUANTITY) {
      correctedQuantity = MIN_QUANTITY;
    }
    if (correctedQuantity > product.availableQuantity) {
      correctedQuantity = product.availableQuantity;
    }

    setInputValue(correctedQuantity.toString());
    if (product.quantity !== correctedQuantity) {
      dispatch({ type: UPDATE_QUANTITY, payload: { productId: product.id, quantity: correctedQuantity } });
    }
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(product.quantity + 1, product.availableQuantity);
    dispatch({ type: UPDATE_QUANTITY, payload: { productId: product.id, quantity: newQuantity } });
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(product.quantity - 1, MIN_QUANTITY);
    dispatch({ type: UPDATE_QUANTITY, payload: { productId: product.id, quantity: newQuantity } });
  };
    const handleRemoveFromCart = () => {
        dispatch({ type: REMOVE_FROM_CART, payload: { productId: product.id } });
    };
  const totalProductPrice = product.current_price * product.quantity;
  const productName = product.name[i18n.language as keyof typeof product.name] || product.name.uk;

  return (
    <li className="flex items-stretch border-b border-gray-200 py-6">
      <div className="relative w-24 h-auto md:w-28 lg:w-32 flex-shrink-0 rounded-md border border-gray-200">
        <img
          src={product.image_url}
          alt={productName}
          className="h-full w-full rounded-md object-cover object-center"
        />
        {product.discount_percentage > 0 && (
            <span className="absolute top-0 rounded-md bg-red-500 px-2 py-1 text-sm md:text-lg text-white -right-1.5">-{product.discount_percentage}%</span>
        )}
      </div>

      <div className="ml-6 flex flex-1 flex-col  lg:pl-4">
        <div>
          <div className="flex justify-between text-base text-gray-900 font-bold md:text-lg">
            <h3>
              <a href={product.product_url}>{productName}</a>
            </h3>
            <p className="ml-4 md:text-xl whitespace-nowrap">{totalProductPrice.toFixed(2)} {t('currency')}</p>
        </div>
          <div className="mt-1 flex items-baseline text-sm md:text-lg text-gray-500">
            <p className="font-bold text-green-600">{product.current_price.toFixed(2)} {t('currency')}</p>
            {product.discount_percentage > 0 && (
              <p className="ml-2 text-xs line-through">{product.original_price.toFixed(2)} {t('currency')}</p>
        )}
          </div>
      </div>
      <div className="mt-1 flex flex-1 items-end justify-between text-sm md:text-lg">
        <div className="flex items-stretch">
          <button
              type="button"
              onClick={handleDecrease}
              className="cursor-pointer rounded-l-md border border-r-0 border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-50"
          >
            -
          </button>
          <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleQuantityChange}
              onBlur={handleBlur}
              className="w-12 select-none border border-gray-300 bg-white text-center text-sm md:text-lg font-medium text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-0"
          />
          <button
              type="button"
              onClick={handleIncrease}
              className="cursor-pointer rounded-r-md border border-l-0 border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-50"
          >
            +
          </button>
        </div>

        <div className="flex">
          <button type="button" className="cursor-pointer font-medium text-red-600 hover:text-red-800"
                  onClick={handleRemoveFromCart}>
            {t('remove')}
          </button>
        </div>
      </div>
      </div>
    </li>
      );
      };

      export default ProductItem;
