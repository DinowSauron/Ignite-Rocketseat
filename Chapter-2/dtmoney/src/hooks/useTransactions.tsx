import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api";

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);



type TransactionsContextData = {
    transactions: Transaction[];
    createTransaction: (transactionInput: TransactionInput) => Promise<void>;
}

type Transaction = {
    id: number;
    title: string;
    category: string;
    amount: number;
    type: "deposit" | "withdraw";
    createdAt: string;
}
type TransactionInput = Omit<Transaction, "id" | "createdAt">;
// type TransactionInput = Pick<Transaction, "title" | "amount" | "type" | "category">;



// cria-se um componente normal
export function TransactionsProvider(props: {children: ReactNode}) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("/transactions")
        .then(res => setTransactions(res.data.transactions));
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date()
        });
        
        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
    }


    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                createTransaction
            }}
        >
            {props.children}
        </TransactionsContext.Provider>
    )
    
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context
}