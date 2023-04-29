---
layout: post
tags: [Unreal,SpaceInvaders, c++]
---

# Space Invaders

A space invaders clone using the Unreal engine as an entry for the  **[Games Job Fair Spring 2023 - Unreal Engine Programming Challenge](https://gamesjobfair.com/programming-challenges-unrealengine-unity)**.

### This entry has been selected as one of the top 3 entries, and the code structure is reviewed by Chris Rock, the Lead Gameplay Programmer at Savage Games. You can watch the review from this [link](https://youtu.be/u3x7nDlHT6s?t=2168)

### Please, Play the game from [itch.io](https://naminaziri.itch.io/space-invaders) and review the code from the [GitHub](https://github.com/NamiNaziri/SpaceInvaders)

<img src="..\assets\images\projects\si_review.png"  width="60%" height="30%">

[<img src="..\assets\images\projects\si_youtube.png"  width="60%" height="30%">](https://youtu.be/JWBiKHRHcaw)

**In this blog post I will go through the project, answering some questions that Chris asked and also how I used different features of unreal engine to create this game.**

## Requirenments

Let's start with the requirenments.

* Gameplay mechanics and core logic should be written in C++.
* There should be three visually different enemy types, but all behave the same.
* An enemy can shoot if no other enemy is in front of it.
* Additionally a UFO will sometimes go across the top of the screen which the player can shoot for bonus points.
* Enemies move left or right as a group and shift downward and change direction every time they reach the screen's edge.
* Enemy group speed gradually increases as enemies are destroyed.
* The player has three lives.
* The game saves the highest score between sessions.
* In each advancing level the enemies start one row lower, unless already at the lowest possible one.
* Above the player are "bunkers" which get eroded when shot at by either the player or enemies, or if they get touched by enemies.
* Cite your sources in your code comments if you use code/methods from elsewhere.
* You're allowed to use Quixel Megascans or marketplace assets as long as they're assets only (no code or BP).

## General thought process

During creation of this game, I wanted to use unreal engine's features as much as possible and also wanted to have different tunable variables that designers (Myself in this project 😄) can use to change the game. I wanted to give as much as flexibility as possible.

Now lets start with Chris's questions.

### To BP or not to BP

The project was almost entirely written in CPP because it was one of the requirements, but I've always tried to explore the different features of Unreal Engine. I'm still in the learning process of how to do this effectively, such as deciding which variables are better suited to be modified by designers, or which variables should be read-only or both readable and writeable. In general, this part of the project has been incredibly insightful for me.The project made almost fully in CPP because it was one of the requirenments. But I always try to utilize different aspects of the unreal engine. And I am in a learning process of how to do this. For example, what variables is better to be available to be changes by designers, or what variables can be a readable or both readable and writeable. In general this part of the review was super insightful for me.

### Is the complexity really necessary

#### Thinking about when to use actor components and when to use actors.

I always try to consider different options, but sometimes it can be challenging. In this case, Chris asked whether our launcher should be an actor or actor component. After considering the options, I decided to use an actor for my launcher for two reasons.

Firstly, I'm using a pool component as the component for the projectile launcher, and although it's possible to use an actor component with another actor component, it's generally considered bad practice.

Secondly, I want to be able to have different types of launchers that can be spawned during the game and collected by the players, which will require an inventory system implemented as an actor component. I appreciate Chris raising this question because it was a difficult decision to make.

#### Pooling Component

There is a comment in my header file indicating that (😄), for the current state of the game, a pooling component isn't necessary. However, if we decide to add more flying components in the future, it may become necessary. I just wanted to demonstrate that I'm aware of the benefits of pooling components😄.

### Seperation of responsibilities

I completely agree with Chris's take. It was a mistake from my end having the direction in the player pawn. In more general way, we probably will use skeletal component for our weapons, this way we can just use a socket for the location and probably the direction of launch.

Regarding the speed, I wanted to allow for more flexibility by enabling the speed to be set both by the function and by the projectile movement component. There's a comment in the header file explaining that if you set the velocity to (-1), it will use the velocity from the projectile movement component. However, I believe there's a bug in the code related to this that I need to fix 😄. Fortunately, it's not currently causing any issues since I'm currently using the speed from the PMC.

### Input bindings

To be honest, I'm not sure I fully understand why the enemies should be able to use the inputs as well.

Another question that came up was why inputs are stored in the pawn instead of the controller. The inputs are handled in both the player pawn and the controller. The controller manages inputs for general purpose actions such as pausing the game, while the player pawn controls gameplay-related inputs for that specific pawn. My reasoning for this was that, during a multiplayer match, when a player is killed, the pawn (or character) will be destroyed, but the controller remains the same and the pawn is respawned. If we wanted to switch to a different character with different inputs, having the inputs stored in the pawn would make this easy, as we could simply spawn a new pawn with the appropriate input settings.

Another example is a character that can use a vehicle. By changing the pawn when the character gets into the vehicle, we can use the input defined by the vehicle. Additionally, the enhanced input system component in Unreal Engine allows for easy changes to the inputs. This gives us the flexibility to adapt to different scenarios and customize inputs for specific situations.

### Collective enemy behavior managed in one class is rigid

Yes it is 😄I have tried to make the spawner class as flexible as possible with the variables provided, but I think the idea of using a controller is pretty interesting.

