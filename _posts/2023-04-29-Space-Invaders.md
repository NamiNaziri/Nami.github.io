---
layout: post
tags: [Unreal,SpaceInvaders, c++]
---
# Space Invaders

A space invaders clone using the Unreal engine as an entry for the  **[Games Job Fair Spring 2023 - Unreal Engine Programming Challenge](https://gamesjobfair.com/programming-challenges-unrealengine-unity)**.

### This entry has been selected as one of the top 3 entries, and the code structure was reviewed by Chris Rock, the Lead Gameplay Programmer at Savage Games. You can watch the review from this [link](https://youtu.be/u3x7nDlHT6s?t=2168)

### Please, Play the game from [itch.io](https://naminaziri.itch.io/space-invaders) and review the code from the [GitHub](https://github.com/NamiNaziri/SpaceInvaders)

<img src="..\assets\images\projects\Nami_Naziri_UE_Challenge.png"  width="60%" height="30%">

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

During the creation of this game, I aimed to utilize Unreal Engine's features to the fullest while also providing various tunable variables that designers (including myself in this project 😄) could use to modify the game. I wanted to offer as much flexibility as possible.

Now lets start with Chris's questions.

### To BP or not to BP

The project is primarily developed in C++ as it was one of the requirements. However, I always strive to leverage various aspects of the Unreal Engine and am currently in the process of learning how to do so. For instance, I am exploring which variables are best suited for designers to modify, or which ones should be designated as readable, writable, or both. Overall, this part of the review has been extremely insightful for my learning process.

### Is the complexity really necessary

#### Thinking about when to use actor components and when to use actors.


I always consider various options, but sometimes it can be challenging. In this case, Chris asked whether our launcher should be an actor or an actor component. After careful consideration, I chose to implement it as an actor for two main reasons.

Firstly, I'm using a pool component as the projectile launcher's component. While it's technically possible to use an actor component with another actor component, it's generally considered best practice to avoid such nested setups.

Secondly, I want the flexibility to have different types of launchers that can be spawned in-game and collected by players. Achieving this will require an inventory system implemented as an actor component. I appreciate Chris for raising this question because it led to a challenging but important decision.

#### Pooling Component

In my header file, there's a comment (😄) stating that, for the current state of the game, a pooling component isn't required. However, it's worth noting that if we decide to incorporate more flying components in the future, a pooling component might become necessary. I wanted to emphasize my awareness of the advantages of pooling components 😄.

### Seperation of responsibilities

I fully agree with Chris's perspective. It was an oversight on my part to have the direction in the player pawn. In a more general approach, we will likely use a skeletal component for our weapons, allowing us to utilize a socket for both the location and potentially the launch direction.

Regarding the speed, I aimed to provide flexibility by allowing it to be set both through the function and the projectile movement component. There's a comment in the header file explaining that setting the velocity to (-1) will use the velocity from the projectile movement component. However, I acknowledge there may be a bug related to this that I need to address 😄. Fortunately, this issue isn't currently causing any problems since I'm presently using the speed from the PMC.

### Input bindings


I'm uncertain about the need for enemies to use inputs as well.

Regarding the storage of inputs, they are kept in the pawn for specific gameplay-related actions, while the controller handles general-purpose inputs like pausing. This design accommodates multiplayer scenarios where a player's pawn can be destroyed and respawned, but the controller remains constant. Storing inputs in the pawn makes it straightforward to spawn a new pawn with the appropriate input settings when needed.

Another benefit is seen when a character transitions to a vehicle; changing the pawn allows us to use the vehicle's defined input. The Unreal Engine's enhanced input system component offers flexibility for adjusting inputs to suit various situations and customize them as needed.

### Collective enemy behavior managed in one class is rigid

Yes it is 😄I have tried to make the spawner class as flexible as possible with the variables provided, but I think the idea of using a controller is pretty interesting.
