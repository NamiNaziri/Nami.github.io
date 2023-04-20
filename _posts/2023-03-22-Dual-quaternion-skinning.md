---
layout: post
tags: [Animation,Skinning, c++]
---
# Dual quaternion skinning

Dual Quaternion Skinning (DQS) is an advanced rigging technique that binds a mesh to skeletal joints. Unlike the popular alternative, Linear Blend Skinning (LBS), DQS avoids the undesirable "candy-wrapper effect" and effectively simulates volume preservation.


### [Github](https://github.com/NamiNaziri/AnimationEngine)


## Vertex Shader

the vertex shader where the magic happens.

```cpp
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec4 aColor;
layout(location = 3) in ivec4 aJoints1;
layout(location = 4) in ivec4 aJoints2;
layout(location = 5) in vec4 aWeights1;
layout(location = 6) in vec4 aWeights2;

const vec3 directionToLight = normalize(vec3(0.5, 0.5, 0.6));
uniform mat4 uWorldToClip;
uniform float uShadingMix;

out vec4 vColor;

const int numJoints = 100;
const int WEIGHTS_PER_VERTEX = 8;
uniform vec4 uDualQuatertions_0[numJoints];
uniform vec4 uDualQuatertions_e[numJoints];

void main()
{
    vec4 b0 = vec4(0.f);
    vec4 be = vec4(0.f);
    for (int i = 0; i < 8; i++)
    {
        if (i < 4)
        {
            b0 += aWeights1[i] * uDualQuatertions_0[aJoints1[i]];
            be += aWeights1[i] * uDualQuatertions_e[aJoints1[i]];
        }
        else
        {
            b0 += aWeights2[i % 4] * uDualQuatertions_0[aJoints2[i % 4]];
            be += aWeights2[i % 4] * uDualQuatertions_e[aJoints2[i % 4]];
        }
    }

    vec4 c0 = b0 / length(b0);
    vec4 ce = be / length(b0);

    float x0 = c0[0];
    float y0 = c0[1];
    float z0 = c0[2];
    float w0 = c0[3];

    float xe = ce[0];
    float ye = ce[1];
    float ze = ce[2];
    float we = ce[3];

    float t0 = 2. * (-1. * we * x0 + xe * w0 - ye * z0 + ze * y0);
    float t1 = 2. * (-1. * we * y0 + xe * z0 + ye * w0 - ze * x0);
    float t2 = 2. * (-1. * we * z0 - xe * y0 + ye * x0 + ze * w0);

    vec4 c1 = vec4(1. - 2. * y0 * y0 - 2. * z0 * z0,
        2. * x0 * y0 + 2. * w0 * z0,
        2. * x0 * z0 - 2. * w0 * y0,
        0.);

    vec4 c2 = vec4(2. * x0 * y0 - 2. * w0 * z0,
        1. - 2. * x0 * x0 - 2. * z0 * z0,
        2. * y0 * z0 + 2. * w0 * x0,
        0.);

    vec4 c3 = vec4(2. * x0 * z0 + 2. * w0 * y0,
        2. * y0 * z0 - 2. * w0 * x0,
        1. - 2. * x0 * x0 - 2. * y0 * y0,
        0.);

    vec4 c4 = vec4(t0, t1, t2, 1.);

    mat4 tranformMat = mat4(c1, c2, c3, c4);

    vec4 SkinnedPosition = tranformMat * aPosition;
    vec3 SkinnedNormal = (tranformMat * vec4(aNormal, 0.f)).xyz;
    vec4 SkinnedColor = aColor;


    float clampedCosine = clamp(dot(SkinnedNormal, directionToLight), 0.0, 1.0);
    vec3 litColor = vec3(clampedCosine);
    vColor = vec4(mix(SkinnedColor.xyz, litColor, uShadingMix), 1);
    gl_Position = uWorldToClip * SkinnedPosition;
}
```

## Reference

[Ladislav Kavan, Steven Collins, Jiri Zara, Carol O'Sullivan. Geometric Skinning with Approximate Dual Quaternion Blending](https://users.cs.utah.edu/~ladislav/kavan08geometric/kavan08geometric.html)
