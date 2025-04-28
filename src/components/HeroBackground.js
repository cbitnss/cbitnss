"use client"
import React from 'react';

class AnimatedGridBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
    };
    this.rows = 10;
    this.cols = 15;
    this.colors = [
      'bg-rose-200/90',
      'bg-slate-200/90',
      'bg-sky-200/90',
      'bg-violet-200/90'
    ];
  }

  componentDidMount() {
    this.initializeGrid();
    this.startAnimation();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  initializeGrid() {
    const initialCells = Array.from({ length: this.rows * this.cols }, (_, index) => ({
      id: `cell-${index}`,
      color: null
    }));
    this.setState({ cells: initialCells });
  }

  startAnimation() {
    this.intervalId = setInterval(() => this.animateCell(), 2000);
  }

  animateCell() {
    this.setState(prevState => {
      const newCells = [...prevState.cells];
      
      // Randomly remove some existing colors
      newCells.forEach(cell => {
        if (cell.color && Math.random() < 0.3) {
          cell.color = null;
        }
      });
      
      // Add new random colors
      const emptyCells = newCells.filter(cell => !cell.color);
      const cellsToColor = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < cellsToColor && i < emptyCells.length; i++) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        emptyCells[randomIndex].color = randomColor;
      }
      
      return { cells: newCells };
    });
  }

  render() {
    return (
      <div className="w-full lg:w-full bg-white -z-10 h-[800px] lg:h-auto overflow-x-hidden overflow-hidden absolute">
        <div 
          className="grid w-full h-full auto-rows-fr border border-gray-200" 
          style={{
            gridTemplateColumns: `repeat(${this.cols}, minmax(0, 1fr))`,
          }}
        >
          {this.state.cells.map(cell => (
            <div
              key={cell.id}
              className={`relative border border-gray-100 transition-colors duration-1000 ease-in-out ${cell.color || 'bg-white'}`}
            >
              <div className="pb-[100%]" />
              <div className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AnimatedGridBackground;
