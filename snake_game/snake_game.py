"""
Snake Game
A classic Snake game implementation using Pygame.
"""

import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
GRID_SIZE = 20
GRID_WIDTH = WINDOW_WIDTH // GRID_SIZE
GRID_HEIGHT = WINDOW_HEIGHT // GRID_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Set up the game window
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Snake Game')

# Game clock
clock = pygame.time.Clock()

# Game states
START_SCREEN = 0
PLAYING = 1
PAUSED = 2
GAME_OVER = 3

class Snake:
    def __init__(self):
        self.positions = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
        self.direction = (1, 0)
        self.length = 1

    def get_head_position(self):
        return self.positions[0]

    def update(self):
        cur = self.get_head_position()
        x, y = self.direction
        new = ((cur[0] + x) % GRID_WIDTH, (cur[1] + y) % GRID_HEIGHT)
        if new in self.positions[2:]:
            return False
        self.positions.insert(0, new)
        if len(self.positions) > self.length:
            self.positions.pop()
        return True

    def reset(self):
        self.positions = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
        self.direction = (1, 0)
        self.length = 1

class Food:
    def __init__(self):
        self.position = (0, 0)
        self.randomize_position()

    def randomize_position(self):
        self.position = (random.randint(0, GRID_WIDTH-1),
                        random.randint(0, GRID_HEIGHT-1))

def draw_text(text, size, x, y, color=WHITE):
    """
    Draw text on the screen
    """
    font = pygame.font.Font(None, size)
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    screen.blit(text_surface, text_rect)
    return text_rect

def draw_button(text, size, x, y, width, height, color, hover_color):
    """
    Draw a button and return its rect
    """
    mouse_pos = pygame.mouse.get_pos()
    button_rect = pygame.Rect(x - width//2, y - height//2, width, height)
    
    # Check if mouse is hovering over button
    if button_rect.collidepoint(mouse_pos):
        pygame.draw.rect(screen, hover_color, button_rect)
    else:
        pygame.draw.rect(screen, color, button_rect)
    
    # Draw button text
    text_rect = draw_text(text, size, x, y)
    
    return button_rect

def start_screen():
    """
    Display the start screen
    """
    screen.fill(BLACK)
    draw_text("SNAKE GAME", 64, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 4)
    draw_text("Use arrow keys to move", 36, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2)
    draw_text("Press P to pause", 36, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 40)
    
    start_button = draw_button("START", 48, WINDOW_WIDTH // 2, WINDOW_HEIGHT * 3 // 4, 200, 60, BLUE, GREEN)
    
    pygame.display.update()
    
    # Wait for player to click start or press a key
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYUP:
                waiting = False
            if event.type == pygame.MOUSEBUTTONUP:
                if start_button.collidepoint(event.pos):
                    waiting = False
    
    return PLAYING

def pause_screen():
    """
    Display the pause screen
    """
    # Draw semi-transparent overlay
    overlay = pygame.Surface((WINDOW_WIDTH, WINDOW_HEIGHT), pygame.SRCALPHA)
    overlay.fill((0, 0, 0, 128))
    screen.blit(overlay, (0, 0))
    
    draw_text("PAUSED", 64, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 3)
    draw_text("Press P to resume", 36, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2)
    
    resume_button = draw_button("RESUME", 48, WINDOW_WIDTH // 2, WINDOW_HEIGHT * 2 // 3, 200, 60, BLUE, GREEN)
    
    pygame.display.update()
    
    # Wait for player to click resume or press P
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_p:
                    waiting = False
            if event.type == pygame.MOUSEBUTTONUP:
                if resume_button.collidepoint(event.pos):
                    waiting = False
    
    return PLAYING

def game_over_screen(score):
    """
    Display the game over screen
    """
    screen.fill(BLACK)
    draw_text("GAME OVER", 64, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 4)
    draw_text(f"Score: {score}", 48, WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2)
    
    restart_button = draw_button("PLAY AGAIN", 48, WINDOW_WIDTH // 2, WINDOW_HEIGHT * 3 // 4, 250, 60, BLUE, GREEN)
    
    pygame.display.update()
    
    # Wait for player to click restart or press a key
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYUP:
                waiting = False
            if event.type == pygame.MOUSEBUTTONUP:
                if restart_button.collidepoint(event.pos):
                    waiting = False
    
    return START_SCREEN

def main():
    game_state = START_SCREEN
    snake = Snake()
    food = Food()
    score = 0

    while True:
        if game_state == START_SCREEN:
            game_state = start_screen()
            snake.reset()
            food.randomize_position()
            score = 0
        
        elif game_state == PLAYING:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_p:
                        game_state = PAUSED
                    else:
                        if event.key == pygame.K_UP and snake.direction != (0, 1):
                            snake.direction = (0, -1)
                        elif event.key == pygame.K_DOWN and snake.direction != (0, -1):
                            snake.direction = (0, 1)
                        elif event.key == pygame.K_LEFT and snake.direction != (1, 0):
                            snake.direction = (-1, 0)
                        elif event.key == pygame.K_RIGHT and snake.direction != (-1, 0):
                            snake.direction = (1, 0)

            if not snake.update():
                game_state = GAME_OVER

            # Check if snake ate the food
            if snake.get_head_position() == food.position:
                snake.length += 1
                score += 10
                food.randomize_position()

            # Draw everything
            screen.fill(BLACK)
            
            # Draw food
            rect = pygame.Rect(food.position[0] * GRID_SIZE,
                              food.position[1] * GRID_SIZE,
                              GRID_SIZE, GRID_SIZE)
            pygame.draw.rect(screen, RED, rect)

            # Draw snake
            for pos in snake.positions:
                rect = pygame.Rect(pos[0] * GRID_SIZE,
                                 pos[1] * GRID_SIZE,
                                 GRID_SIZE, GRID_SIZE)
                pygame.draw.rect(screen, GREEN, rect)
            
            # Draw score
            draw_text(f"Score: {score}", 36, 70, 10)
            
            pygame.display.update()
            clock.tick(10)  # Control game speed
        
        elif game_state == PAUSED:
            game_state = pause_screen()
        
        elif game_state == GAME_OVER:
            game_state = game_over_screen(score)

if __name__ == '__main__':
    main() 