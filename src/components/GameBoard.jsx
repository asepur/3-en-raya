import { Square } from "./Square"

export const GameBoard = ({ board, updateBoard}) => {

    return(
        <section className="game">
        {
          board.map((_, index) => { // primera posición, index
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
            )
          })
        }
      </section>
    )
}

