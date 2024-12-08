import { Square } from "./Square"
import './counter.css'

export const Counter = ({ turn, TURNS }) => {

    return (
        <section className="turn">
            <h4>
                Turno:
            </h4>
            <div className="square__container">
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </div>
        </section>
    )
} 

export default Counter;

