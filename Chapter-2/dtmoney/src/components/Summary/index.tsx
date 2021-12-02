import { Container } from "./styles";
import incomingImg from "../../assets/income.svg"
import outcomingImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"

export function Summary(){

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomingImg} alt="Entradas" />
                </header>
                <strong>R$: 1000,00</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomingImg} alt="Saidas" />
                </header>
                <strong>- R$: 500,00</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="totalImg" />
                </header>
                <strong>R$: 500,00</strong>
            </div>
        </Container>
    );
}