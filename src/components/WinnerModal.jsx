import { Square } from "./Square";

export const WinnerModal = ({children, resetGame})=>{
    if (children === null) return;

    const winnerText = children === false ? 'Tie!': 'Winner: ';

    const className = children?"win":"tie";

    return (
        <section className="winner">
          <div className="text">
            <h2>
              {winnerText}
            </h2>
            <header className={className}>
              {children && <Square>{children}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Play Again!</button>
            </footer>
          </div>
        </section>
      );
}