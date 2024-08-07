
# Todays list

* [ ] StateTree fundamental
* [ ] Continue on smart objects
* [ ] Writng first smart object !?

## State Tree

I think the idea is originated from this [talk](https://www.gdcvault.com/play/1024218/AI-Arborist-Proper-Cultivation-and) (The section where Bobby Anguelov talks).

### Transitions

A Transition in a StateTree can point to any other State in the tree.

A Transition is triggered when a Task completes, succeeds, or fails, or when a monitored condition succeeds.

#### Transition Monitoring

* Monitored constantly
* Monitored at the end of the state

#### Transition Evaluation

Starts from leaf state and progress upwards toward the root. The first succeed that leads to state is selected.

#### Transition Elements

### State selection logic

In general terms, behavior trees keep executing the State selection logic even when a State has been selected. This is the only method for transitioning between States.

StateTree runs the State selection process on-demand, based on Transitions. On the first tick, there is an implicit transition to the root State, which will select the first State to run. Once that State has been selected, the Transitions dictate when and where the selection logic will be executed.

**In my word, in behavior tree in each frame the tree starts from the top evaluating nodes but in stateTree the root node only runs in the first frame and after that only time it will run is the time our transitions lead to it.**

### Executing the State Tasks

Once a State is selected, all its Tasks will begin executing concurrently.

The most common Transition trigger is  **completion** , which is executed **once the first Task** of the active State finishes. Other Transitions can be marked as **conditional** and are tested on each tick. If the conditional Transition passes the test, the State selection logic is executed and the selection process starts at the target State. If the target State has child States, the selection process will consider the child States as part of the selection logic.

## Smart Objects

Agents are responsible for releasing their claimed Slots. This can happen once their behavior is completed or interrupted.

### Difference between smart objects and the gdc talk !??

It's important to note that Smart Objects do not contain execution logic. Instead, they provide all necessary information to the interactor to be able to perform the interaction, depending on its implementation. Each interactor (Agent or Player) does its own implementation logic for a Smart Object.

Note to my self: I don't know if this makes it different to the gdc  talk. I believe by necessary information it means that it has the code that we implemented for the agent or player and gives it to us and we execute it!?

### Handling Slots

If the Smart Object's state changes it will automatically release all Claimed or Occupied Slots and will notify the corresponding Agents through the **OnSlotInvalidatedDelegate** callback. A common example is the Smart Object being destroyed during gameplay.

The Agent can also abort the process at any time for any reason. In this scenario, the Agent is responsible for releasing the Slot so other Agents can claim it. Common examples include the Agent dying or performing another task with a higher priority.

### **SmartObject subsystem**

is the link between the Smart Object components and the collection. This subsystem is automatically created in the level when the Smart Objects plugin is active, and will create the Smart Object collection if it's missing.

### Elements of smart object system

#### SmartObject Subsystem

* keeps track of smart objects in the level
* Link between the smart object components and the collection
* automatically created in the level and will create smart object collection if it's missing

## Sources

https://docs.unrealengine.com/5.0/en-US/overview-of-state-tree-in-unreal-engine/

https://docs.unrealengine.com/5.1/en-US/smart-objects-in-unreal-engine---overview/
