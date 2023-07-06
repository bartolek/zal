from gpiozero import MotionSensor
import time
import os

pir = MotionSensor(4)
last_motion_time = time.time()
turn_off_timer = None
tv_on = False

def print_turn_off_timer():
    global turn_off_timer
    global tv_on  

    if turn_off_timer is not None:
        remaining_time = int(turn_off_timer - time.time())
        if remaining_time <= 0:
            # Wyłącz telewizor
            os.system("echo 'standby 0.0.0.0' | cec-client -s -d 1")
            print("Telewizor wyłączony")
            turn_off_timer = None
            tv_on = False
        else:
            print("Telewizor zostanie wyłączony za", remaining_time, "sekundy")

while True:
    if pir.motion_detected:
        current_time = time.time()
        if (current_time - last_motion_time) > 1:
            last_motion_time = current_time

            if tv_on == False:
                # Włącz telewizor 
                os.system("echo 'on 0.0.0.0' | cec-client -s -d 1")
                print("Wykryto ruch - Telewizor włączony")
                tv_on = True

            turn_off_timer = current_time + 45
            print_turn_off_timer()

    else:
        print_turn_off_timer()

    time.sleep(1)
