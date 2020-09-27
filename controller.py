try:
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
except:
    print("not on RPI 1")


BUTTON_TOP = 20
BUTTON_BOTTOM = 21

try:
    GPIO.setup(BUTTON_TOP, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(BUTTON_BOTTOM, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    clkLastState = GPIO.input(17)
except:
    print("not on RPI 2")

from gpiozero import Buzzer
import time
import datetime
from time import sleep
import operator
import sys
from pynput.keyboard import Key, Controller

keyboard = Controller()

buzzer = Buzzer(16)

def topButton(pin):
    keyboard.press('p')
    keyboard.release('p')

def bottomButton(pin):
    keyboard.press('l')
    keyboard.release('l')

def pinDetect(pin):
    clkState = GPIO.input(17)
    dtState = GPIO.input(27)
    
    global clkLastState
 
    if dtState != clkState:
        buzzer.beep(on_time=0.001, off_time=1, n=1, background=True)
        keyboard.press('q')
        keyboard.release('q')

    else:
        buzzer.beep(on_time=0.001, off_time=1, n=1, background=True)
        keyboard.press('a')
        keyboard.release('a')



clkLastState = GPIO.input(17)

GPIO.add_event_detect(17, GPIO.RISING, callback=pinDetect, bouncetime=30)
GPIO.add_event_detect(BUTTON_TOP, GPIO.FALLING, callback=topButton, bouncetime=300)
GPIO.add_event_detect(BUTTON_BOTTOM, GPIO.FALLING, callback=bottomButton, bouncetime=300)

while True:
        time.sleep(1)