import { useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";
import Modal from "react-modal";

Modal.setAppElement("#root");

type HeaderProps = {
    onOpenTransactionalModal: () => void;
}


export function Header({onOpenTransactionalModal}: HeaderProps) {

    
    return (
        <Container>
            <Content>
                
                <img src={logoImg} alt="dt money" />

                <button type="button" onClick={onOpenTransactionalModal}>
                    Nova Transação
                </button>

            </Content>
        </Container>
    )
}