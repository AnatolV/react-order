const ProductSkeleton = () => {
  return (
    <article className="flex items-center border-b border-gray-200 py-6">
      <div className="h-36 w-28 animate-pulse rounded-md bg-gray-200"></div>
      <div className="ml-6 flex-grow">
        <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
        <div className="mt-2 h-4 w-1/4 animate-pulse rounded-md bg-gray-200"></div>
      </div>
      <div className="flex items-center">
        <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200"></div>
        <div className="mx-2 h-8 w-12 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200"></div>
      </div>
      <div className="ml-6 w-24 text-right">
        <div className="h-6 w-full animate-pulse rounded-md bg-gray-200"></div>
      </div>
    </article>
  );
};

export default ProductSkeleton;
