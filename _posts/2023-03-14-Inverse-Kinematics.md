---
layout: post
tags: [Unreal Engine, SmartObjects]
---
# Jacobian based inverse kinematics

In computer animation and robotics, inverse kinematics is the mathematical process of calculating the variable joint parameters needed to place the end of a kinematic chain, such as a robot manipulator or animation character's skeleton, in a given position and orientation relative to the start of the chain. [Wikipedia](https://en.wikipedia.org/wiki/Inverse_kinematics)

### [Github](https://github.com/NamiNaziri/AnimationEngine)

## Code

```cpp
Eigen::MatrixXd Skeleton::ComputeJacobian(unsigned endEffectorIndex)
{
	// forward
	Vec3f currentEndEffector = getJointWorldPos(endEffectorIndex);

	// Find how far we are from the root.
	unsigned heirarchyDepth = 1; 
	int parent = getJointParent(endEffectorIndex);
	while (parent != 0)
	{
		heirarchyDepth += 1;
		parent = getJointParent(parent);
	}

	Eigen::MatrixXd J(3, 3 * heirarchyDepth); // 3 row since we have 3 angles per bone. 

	int currentJointIndex = endEffectorIndex;
	Skeleton tempSkel = *this;
	double delta = 0.1;

	// For each angle in the bone heirarchy, perform a small change and then calculate the forward pass.
	for (int i = 0; i < 3 * heirarchyDepth; i++) 
	{
		tempSkel = *this;
		int angleIndex = i % 3;

		if (i != 0 && i%3 == 0)
		{
			currentJointIndex = getJointParent(currentJointIndex);
		}

		Vec3f newJointRotation = getJointRotation(currentJointIndex);
		newJointRotation[angleIndex] += delta;
		tempSkel.setJointRotation(currentJointIndex,newJointRotation);
		tempSkel.updateToWorldTransforms();

		Vec3f newEndEffector = tempSkel.getJointWorldPos(endEffectorIndex);

		Vec3f derivative = (newEndEffector - currentEndEffector) / delta;

		J(0, i) = derivative[0];
		J(1, i) = derivative[1];
		J(2, i) = derivative[2];
	}

	return J;
}

Eigen::MatrixXd Skeleton::ComputeJacobianInv(Eigen::MatrixXd J)
{
	return J.completeOrthogonalDecomposition().pseudoInverse();
}
```

```cpp
void Skeleton::SolveIK(unsigned endEffectorJoint, FW::Vec3f goal)
{
	Vec3f endEffectorPos = this->getJointWorldPos(endEffectorJoint);
	float beta = 0.1;
	int counter = 0;

	while (((endEffectorPos - goal).lenSqr() > 0.000001) && counter < 5000)
	{
		Eigen::MatrixXd J = this->ComputeJacobian(endEffectorJoint);
		Eigen::MatrixXd JInv = this->ComputeJacobianInv(J);

		Vec3f deltaE = beta * (goal - endEffectorPos); // Move small amount toward the goal.
		Eigen::Vector3d EdeltaE(double(deltaE.x), double(deltaE.y), double(deltaE.z));

		// A vector that has the changes that need to be applied to the joint angle.
		Eigen::VectorXd newAngles = JInv * EdeltaE;

		int depth = 0;
		int parent = endEffectorJoint;
		while (parent != 0) // Do this untill we reach the root.
		{
			Vec3f newJointAngle;
			for (int i = 0; i < 3; i++)
			{
				newJointAngle[i] = newAngles(depth * 3 + i);
			}

			this->incrJointRotation(parent, newJointAngle);
			parent = getJointParent(parent);
			depth++;
		}

		this->updateToWorldTransforms();
		endEffectorPos = getJointWorldPos(endEffectorJoint);
		counter++;
	}

	if (counter > 4999)
	{
		std::cout << "counter limit exceeded" << std::endl;
	}
}
```

## Reference

Matrix calculation is done using Eigen library

https://eigen.tuxfamily.org/index.php?title=Main_Page

sources:

http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/handouts/IK.pdf

https://cseweb.ucsd.edu/classes/sp16/cse169-a/slides/CSE169_09.pdf

https://math.stackexchange.com/questions/728666/calculate-jacobian-matrix-without-closed-form-or-analytical-form

https://robotics.stackexchange.com/a/22634
