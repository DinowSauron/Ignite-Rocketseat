import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { NewTransactionalModal } from "./components/NewTransactionalModal";
import { TransactionsProvider } from "./hooks/useTransactions";


export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
      setIsTransactionModalOpen(true);
  }
  function handleCloseTransactionModal() {
      setIsTransactionModalOpen(false);
  }



  return (
    <TransactionsProvider>
        <Header onOpenTransactionalModal={handleOpenTransactionModal}/>
        <Dashboard/>
        
        <NewTransactionalModal
          isOpen={isTransactionModalOpen}
          onRequestClose={handleCloseTransactionModal}
        />


        <GlobalStyle/>
    </TransactionsProvider>
  );
}
