
export type AddProductProps = {
  onAddToWishlist: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishlist({ onAddToWishlist, onRequestClose}: AddProductProps) {

  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishlist}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  )
}