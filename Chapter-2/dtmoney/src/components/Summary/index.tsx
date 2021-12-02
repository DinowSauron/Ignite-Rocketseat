import { Container } from "./styles";
import incomingImg from "../../assets/income.svg"
import outcomingImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useTransactions } from "../../hooks/useTransactions";

export function Summary(){

    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transition) => {
        if(transition.type == "deposit") {
            acc.deposits += transition.amount;
            acc.total += transition.amount;
        } else {
            acc.withdraws += transition.amount;
            acc.total -= transition.amount;
        }
        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });



    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomingImg} alt="Entradas" />
                </header>
                <strong> 
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomingImg} alt="Saidas" />
                </header>
                <strong> 
                    -
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="totalImg" />
                </header>
                <strong> 
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    );
}