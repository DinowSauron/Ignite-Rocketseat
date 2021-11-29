import { useState } from "react"
import {RepositoryItem} from "./RepositoryItem"

export function RepositoryList() {

    const repository = {
        name: "portfôlio",
        description: "new portfolio in react",
        link: "https://luizclaudiocardoso.vercel.app/"
    }

    const [count, setcount] = useState(0)

    return (
        <section className="repository-list">
            <h1>Lista de Repositorios</h1>

            {count}
            <button onClick={() => {setcount(count + 1)}}> add </button>
            
            <ul>
                <RepositoryItem 
                    repository={repository}
                />
                <RepositoryItem />
                <RepositoryItem />
                <RepositoryItem />
            </ul>
        </section>
    )
}