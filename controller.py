try:
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
except:
    print("not on RPI 1")

from time import sleep

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

Enc_A = 17
Enc_B = 27

def pinDetect(pin):
    # clkState = GPIO.input(17)
    # dtState = GPIO.input(27)
    
    # global clkLastState
 
    # if dtState != clkState:
    #     keyboard.press('q')
    #     buzzer.beep(on_time=0.001, off_time=1, n=1, background=True)
    #     keyboard.release('q')

    # else:
    #     keyboard.press('a')
    #     buzzer.beep(on_time=0.001, off_time=1, n=1, background=True)
    #     keyboard.release('a')
    sleep(0.002)
    Switch_A = GPIO.input(Enc_A)
    Switch_B = GPIO.input(Enc_B)

    if (Switch_A == 1) and (Switch_B == 0):
        keyboard.press('q')
        buzzer.beep(on_time=0.001, off_time=1, n=1, background=True)
        keyboard.release('q')
        while Switch_B == 0:
            Switch_B = GPIO.input(Enc_B)
        while Switch_B == 1:
            Switch_B = GPIO.input(Enc_B)
        return

    elif (Switch_A == 1) and (Switch_B == 1):
        keyboard.press('a')
        buzzer.beep(on_time=0.001, off_time=1, n=1, background=True)
        keyboard.release('a')
        while Switch_A == 1:
            Switch_A = GPIO.input(Enc_A)
        return
    else:
        return



clkLastState = GPIO.input(17)

GPIO.add_event_detect(17, GPIO.RISING, callback=pinDetect, bouncetime=50)
GPIO.add_event_detect(BUTTON_TOP, GPIO.FALLING, callback=topButton, bouncetime=300)
GPIO.add_event_detect(BUTTON_BOTTOM, GPIO.FALLING, callback=bottomButton, bouncetime=300)

while True:
        time.sleep(1)