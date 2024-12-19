import requests
import threading
import time

# Configuration for Blooket Bot
class BlooketBot:
    def __init__(self, name, pin, speed, accuracy):
        self.name = name
        self.pin = pin
        self.speed = speed
        self.accuracy = accuracy
        self.session = requests.Session()

    def join_game(self):
        """Join the Blooket game using the provided PIN and name."""
        url = f"https://api.blooket.com/api/game/join"
        payload = {"name": self.name, "pin": self.pin}
        response = self.session.post(url, json=payload)

        if response.status_code == 200:
            print(f"Bot {self.name} joined game {self.pin} successfully!")
        else:
            print(f"Bot {self.name} failed to join game. Response: {response.text}")

    def perform_actions(self):
        """Simulate answering questions based on accuracy and speed."""
        while True:
            # Simulate a delay based on bot speed
            time.sleep(self.speed / 1000.0)

            # Simulate answering a question
            correct = "Correct" if (self.accuracy / 100.0) > 0.5 else "Incorrect"
            print(f"Bot {self.name} answered a question: {correct}")

            # For simplicity, break after one cycle (or keep running for live games)
            break

# Start multiple bots
def start_bots(bot_config, number_of_bots):
    bots = []

    for i in range(number_of_bots):
        bot_name = f"{bot_config['name']}-{i+1}"
        bot = BlooketBot(
            name=bot_name,
            pin=bot_config['pin'],
            speed=bot_config['speed'],
            accuracy=bot_config['accuracy']
        )
        bots.append(bot)

    # Start bots in separate threads
    for bot in bots:
        threading.Thread(target=bot.join_game).start()
        threading.Thread(target=bot.perform_actions).start()

if __name__ == "__main__":
    # Example configuration
    bot_config = {
        "name": "TestBot",
        "pin": "123456",
        "speed": 1000,  # Speed in milliseconds
        "accuracy": 80  # Accuracy in percentage
    }

    number_of_bots = 5
    start_bots(bot_config, number_of_bots)
