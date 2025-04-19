# Snake Game

A classic Snake game implementation using Pygame. This is a modern take on the timeless Snake game, featuring smooth controls, multiple game states, and a clean user interface.

## Features

- Classic snake gameplay mechanics
- Multiple game states (Start Screen, Playing, Paused, Game Over)
- Score tracking
- Smooth controls
- Clean and modern user interface
- Responsive design

## Requirements

- Python 3.x
- Pygame 2.5.2

## Installation

1. Clone this repository or download the source code
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## How to Play

1. Run the game:
   ```bash
   python snake_game.py
   ```

2. Controls:
   - Use arrow keys to control the snake's direction
   - Press 'P' to pause the game
   - Press 'ESC' to quit
   - Press 'SPACE' to start a new game after game over

## Game Rules

- Control the snake to eat the food (red squares)
- Each time the snake eats food, it grows longer
- Avoid hitting the walls or the snake's own body
- The game ends if the snake collides with itself or the walls

## Project Structure

- `snake_game.py` - Main game file containing all game logic and implementation
- `requirements.txt` - List of Python dependencies

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License. 