import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import Modal from "react-modal";
import CloseImg from "../../assets/close.svg"
import IncomeImg from "../../assets/income.svg"
import OutcomeImg from "../../assets/outcome.svg"
import { FormEvent, useState, useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";

type NewTransactionalModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionalModal({isOpen, onRequestClose}: NewTransactionalModalProps) {

    const { createTransaction } = useTransactions();

    const [type, setType] = useState<"deposit" | "withdraw">("deposit");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            type,
            category,
        });

        setTitle("");
        setCategory("");
        setAmount(0);
        setType("deposit");

        onRequestClose();
    }
   

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close">
                <img src={CloseImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input 
                type="text" 
                value={title}
                onChange={event => {setTitle(event.target.value)}}
                placeholder="Titulo"/>
                <input 
                type="number" 
                value={amount}
                onChange={event => {setAmount(Number(event.target.value))}}
                placeholder="Valor"/>

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        isActive={type === "deposit"}
                        activeColor={"green"}
                        onClick={() => setType("deposit")}>
                        <img src={IncomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        isActive={type === "withdraw"}
                        activeColor={"red"}
                        onClick={() => setType("withdraw")}>
                        <img src={OutcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                type="text" 
                value={category}
                onChange={event => {setCategory(event.target.value)}}
                placeholder="Categoria"/>

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}