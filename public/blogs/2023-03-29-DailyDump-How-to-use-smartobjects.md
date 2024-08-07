
# Steps to use smart objects

We have a custom blueprint that let's you perform gameplay ability tasks as your behavior. This way you ensure that the animations (anim montages) get replicated.

1. Create a gameplay ability and call it BP_SO_GA_***. don't forgot to call the aquire ability for your character.
2. Create GameplayBehavior_AbilityBased blueprint, call it BP_SO_Behavior_*** and assign your gameplay ability to it.
3. Create GameplayBehaviorConfig, call it BP_SO_BehaviorConfig, and assign the gameplay behavior that you created in the first step
4. Create SmartObjectDefinition (Note: this is an asset. So to create one, right click on the content browser and from artificial intelligence tab, create one). call it SO_Definition_***. now you can create your slots.
5. Create an actor and call it BP_SO_***. this actor will be your smart object! add smart object component to it and also don't forget assigning the definition asset to it. this is your smart object, as an example if this is a fireplace, you can add a static mesh that represents the fire place and so on.



## changes

now we can use the smart object slots as warp point. in current approach the warp point is updated before using the smart object. there is a seperate task that does this as well, but I haven't used it. should rethink later.
