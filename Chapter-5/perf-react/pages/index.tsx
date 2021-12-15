import Head from 'next/head'
import Image from 'next/image'
import { useCallback } from 'react';
import { FormEvent, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });



  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);


  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()) 
      return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormated: formatter.format(product.price),
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0);

    setResults({data: products, totalPrice});
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}



/**
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houver alteração, vai atualizar oque alterou
 */