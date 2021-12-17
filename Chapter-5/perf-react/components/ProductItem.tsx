import dynamic from "next/dynamic";
import { AddProductProps } from "./AddProductToWishlist";

import { memo, useState } from "react"; // importar lazy, se não tiver no next


//import { AddToWishlist } from "./addProductToWishlist"; // colocado em lazy load


const AddProductToWishlist = dynamic<AddProductProps>(() => {
  return import("./AddProductToWishlist").then(mod => mod.AddProductToWishlist)
}, {
  loading: () => (<span>Carregando...</span>)
});

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
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);


  return (
    <div>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos Favoritos</button>
      {product.title} - <strong>{product.priceFormated}</strong>
      {isAddingToWishlist && (
        <AddProductToWishlist 
          onAddToWishlist={() => onAddToWishlist(product.id)} 
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

// shallow compare
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // {} === {} -> false
  // igualdade referencial

  return Object.is(prevProps.product, nextProps.product);
})