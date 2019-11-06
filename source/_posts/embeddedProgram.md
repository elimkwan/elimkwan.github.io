---
title: Embedded Programming with TI-RSLK Kit Set
date: 2019-08-05 01:30:30
tags:
cover_index: "https://www.dropbox.com/s/4wzg3ngro38if0e/thumb-TI-RSLK.jpg?raw=1"
---
<p>
In the unit Embedded and Real Time System, I had had the chance to worked with the TI-Robotics-System-Learning-Kit, where I learnt much more about embedded real time system
</p>

<h1 style="color:#7ecaf6;" class="fas fa-briefcase"> Polling Vs Interrupts </h1>
The task was to develop a program that allows the robot that has two modes of operations using both polling and interrupts techniques:
<li> (Operation 1: Autonomous mode) upon pressing switch SW1, the robot operates
using predefined route and immediately stop when any of bump switches are
touched.</li>
<li> (Operation 2: Free-motion mode) upon pressing switch SW2, the robot freely move
forward but will change direction of movement according to the interrupted bump
switches.</li>
<li>Measure and compare interrupt latency and polling latency </li>
<br>
<br>
<em>Example of using bitwise operations to program the motor to move:</em>
{% codeblock lang:c %}
// Function: dcMotor_Left
// Description: Drives the left motor forward and the right motor backward
void dcMotor_Left(uint16_t duty, uint32_t period){
    P1->OUT &= ~0xC0;
    P2->OUT &= ~0xC0;

    uint32_t i;

    // Motor Turn Left
    P1->DIR |= 0x80;
    P1->OUT |= 0x80;

    for(i=0; i<period; i++){
      P2->OUT |= 0xC0;   // on
      vTaskDelay( 1 );
      P2->OUT &= ~0xC0;  // off
      vTaskDelay( 1 );
    }

    P1->OUT &= ~0xC0;
    P2->OUT &= ~0xC0;
}
{% endcodeblock %}

<br>
<br>
<br>
<h1 style="color:#7ecaf6;" class="fas fa-briefcase">  Real-Time Operating System (RTOS) with Round Robin Algorithm </h1>
<li> Use Real-time operating system (RTOS) to achieve Autonomous mode and Free-motion mode while having music playing simultaneously</li>
<li> Use of Round Robin algorithm as scheduling mechanism in RTOS.</li>
<li> Scheduling CPU usage and managing shared resources </li>
<li> Use of semaphore in RTOS.</li>
<br>
<br>
Snapshot of the code:
{% codeblock lang:c %}
static void Switch_Init(void){
    // negative logic built-in Button 1 connected to P1.1
    // negative logic built-in Button 2 connected to P1.4
    P1->SEL0 &= ~0x12;
    P1->SEL1 &= ~0x12;      // configure P1.4 and P1.1 as GPIO
    P1->DIR &= ~0x12;       // make P1.4 and P1.1 in
    P1->REN |= 0x12;        // enable pull resistors on P1.4 and P1.1
    P1->OUT |= 0x12;        // P1.4 and P1.1 are pull-up
}

static void taskPlaySong(void *pvParameters){
    init_song_pwm();
    for( ;; ){
        play_song();
    }
}

// This task got priority 2
static void taskMasterThread( void *pvParameters )
{
        int i;
        int pressed = 0;
        ColorLED_Init();

        RedLED_Init();
        REDLED = 1; //Switch on the LED

        pressed = SW1IN | SW2IN;
        while(!pressed){                  // Wait for SW2 switch
            for (i=0; i<1000000; i++);  // Wait here waiting for command
            REDLED = !REDLED;           // The red LED is blinking
            pressed = SW1IN | SW2IN;
            if (SW1IN){
                mode = 1;
            }
            else if (SW2IN){
                mode = 2;
            }
        }

        REDLED = !REDLED; //i.e. REDLED = 0;
        vTaskSuspend(NULL); // suspend itself
}

//--------------------------Interrupt functions -----------------------
void BumpEdgeTrigger_Init(void){
    P4->SEL0 &= ~0xED;
    P4->SEL1 &= ~0xED;      // configure as GPIO
    P4->DIR &= ~0xED;       // make in
    P4->REN |= 0xED;        // enable pull resistors
    P4->OUT |= 0xED;        // pull-up
    P4->IES |= 0xED;        // falling edge event
    P4->IFG &= ~0xED;       // clear flag
    P4->IE |= 0xED;         // arm the interrupt
    // priority 2 on port4
    NVIC->IP[9] = (NVIC->IP[9]&0xFF00FFFF)|0x00D00000; //Numerical Priority 6
    // enable interrupt 38 in NVIC on port4
    NVIC->ISER[1] = 0x00000040;
}

void Port4_Init(void){
    P4->SEL0 &= ~0xED;
    P4->SEL1 &= ~0xED;      // configure as GPIO
    P4->DIR &= ~0xED;       // set as input
    P4->REN |= 0xED;        // enable pull resistors
    P4->OUT |= 0xED;        // set xx are pull-up
    //see if it works?
    P4->IES |= 0xED;      // falling edge event
}


void PORT4_IRQHandler(void){
    // Interrupt Vector of Port4
    // Shared Variable
    bumpSwitch_status = P4->IV;      // 2*(n+1) where n is highest priority

    BaseType_t xHigher;
    xHigher = pdFALSE;

    P4->IFG &= ~0xED; // clear flag


    xSemaphoreGiveFromISR(xBSemaphore, &xHigher);
//    the interrupt handler will give a semaphore
}

void outputLED_response_ISR(unsigned char bumpSwitch_status){

    static const TickType_t xShortBlock = pdMS_TO_TICKS( 300 );
    int i;

    switch(bumpSwitch_status){
      case 0x02: // Bump switch 1
          Port2_Output2(SKYBLUE);
        break;
      case 0x06:// Bump switch 2
          Port2_Output2(RED);
        break;
      case 0x08: // Bump switch 3
          Port2_Output2(PINK);
        break;
      case 0x0C: // Bump switch 4
          Port2_Output2(YELLOW);
        break;
      case 0x0E: // Bump switch 5
          Port2_Output2(GREEN);
        break;
      case 0x10: // Bump switch 6
          Port2_Output2(BLUE);
        break;
      case 0xED: // neither switch pressed
          Port2_Output2(COLOUROFF);
        break;
      default:
          Port2_Output2(WHITE);
    }
    for (i=0; i<100000; i++);
    Port2_Output2(COLOUROFF);
}

static void taskInterrupt(void *pvParamters){
    //Initialise the interrupt
    EnableInterrupts();       // Clear the I bit

    for ( ;; ){
        xSemaphoreTake(xBSemaphore, portMAX_DELAY);
        dcMotor_Stop(1);
        vTaskSuspend(taskHandle_Main);
        vTaskSuspend(taskHandle_PlaySong);
        //Make sure the motor is stopped

        //change colours - value stored in the global variable
        outputLED_response_ISR(bumpSwitch_status);

        //look at which mode we are on
        if (mode == 1){
            dcMotor_Stop(1);
            stop = 1;
        }
        else if (mode == 2){
            dcMotor_response_interrupt(bumpSwitch_status);
            vTaskResume(taskHandle_PlaySong);
        }

        vTaskResume(taskHandle_Main);
    }
}

static void taskMain(void *pvParameters){
    dcMotor_Init();
    int j = 0;
    for ( ;; ){
        if (SW1IN){
            mode = 1;
            stop = 0;
            vTaskResume(taskHandle_PlaySong);
        }
        else if (SW2IN){
            mode = 2;
        }
        if (mode == 1){
            // predefined route, stop when pressed
            if (!stop){
                j = 0;
                while (stop == 0 && j < 1000){
                    dcMotor_Backward(500, 1000);
                    j++;
                }
                j = 0;
                while (stop == 0 && j < 1000){
                    dcMotor_Left(500, 1000);
                    j++;
                }
            }
            dcMotor_Stop(1);
        }
        else if (mode == 2){
            //do something else
            dcMotor_Forward(500, 1);
        }

    }
}
//--------------------------Interrupt functions -----------------------
//
//
//
//
//
//--------------------------Polling functions -----------------------
// a static void function for taskReadInputSwitch
static void taskReadInputSwitch( void *pvParameters ){
    // This function act as a switch press once to stop playing,
    // press second time to resume

    char i_SW1=0;
    int i;

    for( ;; )
    {
        if (SW1IN == 1) { // 1 means being pressed
            mode=1;
            flag=0;
            i_SW1 ^= 1;                 // toggle the variable i_SW1
            for (i=0; i<1000000; i++);  // this waiting loop is used
            // to prevent the switch bounce.
        }

        else if (SW2IN == 1){
            mode=2;
            flag=0;
            for (i=0; i<1000000; i++);  // this waiting loop is used
            // to prevent the switch bounce.
        }

    }
}

// TODO: create a static void function for taskBumpSwitch
static void taskBumpSwitch(void *pvParameters){
    // TODO: initialise bump switches
    BumpSwitch_Init();
    // TODO: Read the input of bump switches forever:
    //       Continuously read the 6 bump switches in a loop,
    //       and return it to the "bumpSwitch_status" variable.
    //       Note that the bumpSwitch_status is a global variable,
    //       so do not declare it again here locally.
    for( ;; ){
        // TODO: use bumpSwitch_status as the variable and
        //       use Bump_Read_Input to read the input
        bumpSwitch_status = Bump_Read_Input();
    }
}

// TODO: create a static void function for taskDisplayOutputLED
static void taskDisplayOutputLED(void *pvParameters){
    for( ;; ){
        // TODO: use outputLED_response as the function and
        //       use bumpSwitch_status as the parameter
        outputLED_response(bumpSwitch_status);
    }
}

// TODO: create a static void function for taskdcMotor
static void taskdcMotor(void *pvParameters){

    // TODO: initialise the DC Motor
    dcMotor_Init();

    // TODO: use a polling that continuously read from the bumpSwitch_status,
    //       and run this forever in a while loop.
    //       use dcMotor_response and bumpSwitch_status for the parameter
    for ( ;; ){
        if (mode==1){

            flag=dcMotor_stop_flag(bumpSwitch_status);

            while (flag==1){
                 dcMotor_Stop(500);
            }
            vTaskSuspend(taskHandle_PlaySong);

        }

        else if (mode==2){
            flag=0;
            dcMotor_response(bumpSwitch_status);
            vTaskResume(taskHandle_PlaySong);
       }
    }
}
//--------------------------Polling functions -----------------------
{% endcodeblock %}

Full code can be found on <em><a href="https://github.com/elimkwan/EmbeddedSystemProgramming" target="_blank" rel="noopener">GITHUB

<br>
<br>
<br>
<h3>Key Skills developed:<h3>
<button>#Embedded Real Time System</button>  <button>#Embedded Programming</button>  
<br>
<br>
<button>#Low level programming</button>  <button>#TI-RSLK Kit Set</button> 
<br>
<br>
<button>#Real-Time Operating System</button>
