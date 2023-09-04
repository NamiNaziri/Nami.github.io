---
layout: post
tags: [c++, Blueprint, AI, Gameplay]
---

# Prototypes

Here, I present a compilation of numerous prototypes I have meticulously crafted using the powerful Unreal Engine. These prototypes showcase my creative and technical prowess, providing a glimpse into my diverse range of skills and expertise. Here, I have listed several prototypes I have developed in Unreal Engine.

**It is important to note that the purpose of a prototype is to explore and test what can be achieved, so it may not necessarily have high visual quality.**

## Multi-AI Coordination

Coordinating multiple AI systems can be a complex undertaking. In this ongoing prototype, I have developed various AI entities that are overseen by a central manager. Each AI relies on its perception abilities to detect the player. Once a player is detected, the AI seeks guidance from the manager regarding the appropriate course of action. The manager assumes the responsibility of coordinating the different AI systems and employs EQS (Environment Query System) to identify suitable locations for each AI to carry out its tasks effectively.

[<img src="..\assets\images\projects\ac1_youtube.png"  width="60%" height="30%">](https://youtu.be/-NiZoS2Juq0)

[<img src="..\assets\images\projects\ac2_youtube.png"  width="60%" height="30%">](https://www.youtube.com/watch?v=wEq5Qm0yc40)

## Smart Objects

A prototype consisting of replicated smart objects for AI agents. Smart objects contain behaviors that AI agents can execute. Generally, AI agents query the environment to locate and subsequently claim and use smart objects. Once an agent has claimed a smart object, others cannot use it.

[<img src="..\assets\images\projects\so_youtube.png"  width="60%" height="30%">](https://youtu.be/-VjC0EW64lQ)

## Boss battle

An old prototype of a boss battle using behavior trees. Each behavior tree is consist of several selectors, sequences, decorators, services and of course lots of tasks. During this prototype I have created custom decorators, sevices and tasks.

[GitHub](https://github.com/NamiNaziri/UE4_AI_BehaviorTree)

## Wraith Portal

Wraith is one of the characters in Apex Legends; her ultimate ability, Dimensional Rift, places an entrance and exit portal that allows her squad to be safely transported over long distances. You can read more about her ultimate from [here](https://apexlegends.fandom.com/wiki/Wraith#Dimensional_Rift)

[<img src="..\assets\images\projects\w_youtube.png"  width="60%" height="30%">](https://youtu.be/PI4tASOpmQQ)

**How it works?**

There are two overlapping boxes. The inside overlapping box serves as the actual portal, while the outside overlapping box functions as a window to prevent the player from being sucked into the portal after they have just used it. This is how it is implemented in the game.


The portal ability is created as an actor component and can be attached to any character. You can find the properties of the portal and the ability in the wiki link above or in the following image.

[<img src="..\assets\images\blogs\wraithInfo.png"  width="60%" height="30%">]()


There are variables that you can change to achieve the same functionality.

**Ability properties**

[<img src="..\assets\images\blogs\ability.png"  width="60%" height="30%">]()

* In the game, there is a start delay before entering portal mode, which you can adjust using the **Start Delay** setting.
* **Range** is the range of the portal.
* **WraithSpeedBoostMultiplier** is a curve that can be used to achieve the same speed boost result as in the game.
* Wraith can cancel her ability in the game if she uses only 4.72% of her ability energy. You can acheive the same result by adjusting the **Cancel Range** variable.

**Portal properties**

[<img src="..\assets\images\blogs\portal.png"  width="60%" height="30%">]()


