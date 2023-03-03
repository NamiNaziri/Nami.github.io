---
layout: post
tags: [Unreal Engine, SmartObjects]
---
In this blog post, I will share my experience and knowledge about smart objects in Unreal Engine. My aim is to provide useful insights for anyone who is interested in learning about smart objects in UE4.

**This tutorial assumes a working knowledge of fundamental AI tools available in Unreal Engine, including behavior trees, blackboards, and EQS. Additionally, the reader is expected to be familiar with C++. Please note that this tutorial is geared towards intermediate to advanced users and may not be suitable for beginners.**

### Prerequisites

You may find these resources useful in your journey.

[Remember to Relax! Realizing Relaxed Behaviors in AAA Games](https://www.gdcvault.com/play/1022230/Remember-to-Relax-Realizing-Relaxed)

Bobby Anguelov and Jeet Shroff gave an excellent talk about smart objects which serves as a great introduction to the topic. In fact, I'll be using it as my main reference. I'm curious to see how closely Unreal Engine matches their ideas, and how we can achieve similar functionality.

For an official overview and quick start tutorial, check out these links dedicated to smart objects.

[Smart Objects Overview](https://docs.unrealengine.com/5.0/en-US/smart-objects-in-unreal-engine---overview/)

[Smart Objects Quick Start](https://docs.unrealengine.com/5.0/en-US/smart-objects-in-unreal-engine---quick-start/https://)

There are also plenty of basic tutorials available on YouTube. If you're interested, feel free to explore and find one that works for you.


### Classes needed for SO

when it comes to class heirarchy in unreal engine, we often see a very deep hairarchy that might be confusing at first. It is the same in smart objects.

When creating a smart object we need to create several assets and classes. In this section I'll go through each class and explain each of them and we'll see why this heirarchy is necessary to have.


GameplayBehavior

GameplayBehaviorConfig

Smart Object Definition

Smart Object Gameplay Behavior Definition ????

Smart object itselft which is an actor with smart object component. 

What is Smart Object Zone Annotations

Why do we need GameplayBehaviorConfig

USmartObjectBehaviorDefinition ????

---



Each SmartObjectDefinition is instanciated during runtime and it is stored and managed by SmartObjectRuntime

---



FindSmartObjects() function returns every available slots ( Considering the tags and the box)

---



There is a RuntimeSmartObjects map in the SmartObjectSubsystem which given SmartObjectHandle as key it gives the SmartObjectRuntime.

TMap<FSmartObjectHandle, FSmartObjectRuntime> RuntimeSmartObjects;


The SmartObjectHandle is a handle to the smart object that is registered to the subsystem (it other words all smart object register to the SmartObjectSubsystem using its handle)

---



FSmartObjectSlotHandle: Struct used to identify a runtime slot instance

---



Fun(Important)Fact:

The Smart object or to be more specific slots of the smart object don't know anything about occupation and claiming state. The claiming state is handled in the SmartObjectSubsystem.

There is a Map in this class called RuntimeSlotStates which is a map between FSmartObjectSlotHandle and FSmartObjectSlotClaimState and is responsible for handling the claiming state.

(This is exactly the problem I was facing for my waypoint system. I didn't know where to put the claiming waypoint, in the waypoing itself or inside the waypoint manager. In my approach I had it in the waypoint manager, but instead of having a map and enum setup, I had two different arrays, one for avialable waypoints and another one for disabled waypoints.)


The FSmartObjectSlotClaimState is defind as a struct to store and manage state of a runtime instance associated to a given slot definition. In simpler word, it contains the state enum and also some helper function like Claim and Release. This is also a FSmartObjectUserHandle instance which I don't know what it is and why. 

---



So in practice the FindSmartObjects function works as following

1. gets all the SmartObjectHandle using the SpacePartition
2. For each SmartObject Handle
   1. gets the runtime instance
   2. again checks if it is inside the query box (God knows why!)
   3. Based on the query filter finds the available slots (checks the filter and also checks if the slot is already claimed or not)
   4. Adds the slots to the OutResult
