import ResetButton from "./ResetButton.jsx"
import { Square } from "./Square.jsx"
import './winnerModal.css'


export function WinnerModal ({ winner, resetGame }) {
    if (winner === null) return null    

    const winnerText = winner === false ? 'empate' : 'victoria para'

    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>

                <header className="win">
                    {
                        winner && <Square>{winner}</Square>
                    }
                </header>

                
                
                <div onClick={resetGame} className="resetGame">
                    <ResetButton />
                </div>

            </div>
        </section>
    )
}
    