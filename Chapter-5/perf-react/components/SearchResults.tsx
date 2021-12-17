import { useMemo } from "react";
import { ProductItem } from "./ProductItem"

import { List, AutoSizer, ListRowRenderer } from "react-virtualized";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormated: string;
  }>;
  totalPrice: number;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({results, totalPrice, onAddToWishlist}: SearchResultsProps) {

  /*
  const totalPrice = useMemo(() => { 
    return results.reduce((total, product) => {
      return total + product.price
    }, 0);
  }, [results]);
  */

  const rowRenderer: ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )

  }

  
  return (
    <div>

      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={500}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/**/}
    </div>
  )
}