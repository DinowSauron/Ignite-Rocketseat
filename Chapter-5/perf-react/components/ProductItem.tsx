import { memo } from "react";

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    priceFormated: string;
    title: string;
  };
  onAddToWishlist: (id:number) => void;
}


function ProductItemComponent({product, onAddToWishlist}: ProductItemProps) {

  return (
    <div>
      <button onClick={() => onAddToWishlist(product.id)}>Add to wishlist</button>
      {product.title} - <strong>{product.priceFormated}</strong>
    </div>
  )
}

// shallow compare
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // {} === {} -> false
  // igualdade referencial

  return Object.is(prevProps.product, nextProps.product);
})