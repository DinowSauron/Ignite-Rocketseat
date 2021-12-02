import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal"
import { useState } from "react";
import { NewTransactionalModal } from "./components/NewTransactionalModal";


export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
      setIsTransactionModalOpen(true);
  }
  function handleCloseTransactionModal() {
      setIsTransactionModalOpen(false);
  }


  return (
    <>
        <Header onOpenTransactionalModal={handleOpenTransactionModal}/>
        <Dashboard/>
        
        <NewTransactionalModal
          isOpen={isTransactionModalOpen}
          onRequestClose={handleCloseTransactionModal}
        />


        <GlobalStyle/>
    </>
  );
}
