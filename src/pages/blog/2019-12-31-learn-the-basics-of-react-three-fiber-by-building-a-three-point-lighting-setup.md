---
templateKey: blog-post
title: Learn the Basics of React Three Fiber by Building a Three-Point Lighting Setup
date: 2019-12-31T21:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/three-point-lighting.jpg
description: >-
  React three fiber is a powerful library allowing you to leverage the awesome declarative UI model of React to create Three.JS WebGL scenes.
tags:
  - programming
  - intermediate
  - javascript
  - react
  - Three.js
  - libraries
  - tutorials
---

We're going to build a simple scene using `react-three-fiber` a powerful library for building WebGL scenes with React. Skip to the end to see the completed scene, or follow along as we build it together. Under the hood, the library uses the `Three.js` library, so we will also take a look at how the two libraries work together to make building 3d scenes more accessible than ever before on the web.

# Setting Up React Three Fiber

Before we start creating our 3d scene, we need to set up `react-three-fiber` by installing a few dependencies in our react app. You can start with a standard `create-react-app` application. Either run `npx create-react-app three-point-lighting` . Or you can create a new react sandbox at codesandbox.io. Once you have a brand new react app run `npm install three react-three-fiber` to install the dependencies we need to complete this project. It's also a good idea at this point to replace the contents of `style.css` with the following. The following change is to ensure your 3d canvas element added later takes up the entire browser viewport by setting the height of all the parent elements to 100%.

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
```

Now we can import `Canvas` in the `index.js` file.
Then change the `App` component to return the `Canvas` component. This results in a react app that renders a WebGL
canvas element at the top level.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber"; // highlight-line

import "./styles.css";

function App() {
  return <Canvas />; // highlight-line
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Creating our First 3d Object

To create a 3d object with `react-three-fiber` we start by creating a new react component. Let's create one now called `Sphere`.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

// highlight-start
function Sphere() {
  return (
    <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}
// highlight-end

function App() {
  return (
    <Canvas>
      <Sphere /> // highlight-line
    </Canvas>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Even though this is a standard react component, because we are using `react-three-fiber`, there are some unique new components available to us to use inside of its render method. Notice the `mesh` component, which has two children, `sphereGeometry` and `meshStandardMaterial`. These three components are only available because the top-level `Canvas` element is providing them via context to all of its children. This is the true power of the react-three-fiber. It translates the three.js API into a React component based API. All three of these are objects from the [three.js WebGL library.](https://threejs.org/) By convention the component is generally named the same as the Three.js version, but with a lower case first letter.

1. https://threejs.org/docs/index.html#api/en/objects/Mesh
2. https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry
3. https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial

Notice how in the mesh documentation, to create a new mesh, you need to pass two parameters? A geometry and a material? Under the hood, `react-three-fiber` is translating this component tree into `three.js` function calls and providing the geometry and material children to the mesh. Also, notice that the props of the `mesh`, `sphereGeometry`, and `meshStandardMaterial` match the allowed options for each class in `three.js` To use `react-three-fiber` you often need to refer to the `three.js` documentation.

## Let There be Light

Now we have a sphere in our 3d scene, but you're probably wondering why it looks pure black. The sphere is pure dark because our scene has no lights, let's add one next.

1. https://threejs.org/docs/index.html#api/en/lights/RectAreaLight

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

// highlight-start
function Light({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
// highlight-end

function Sphere() {
  return (
    <mesh
      visible
      userData={{ test: "hello" }}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <Light brightness={10} color={"white"} /> // highlight-line
      <Sphere />
    </Canvas>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

We start by creating a new component called `Light` and this time instead of returning a `mesh` we return a `rectAreaLight`. This type of light has a height, width, color, and intensity. Set them up as seen in the code snippet, but then try changing the brightness and color values to see how it impacts your scene. You should see the lighting on your sphere change as you manipulate these values.

This step also illustrates an important fact about `react-three-fiber`. Because all the objects you are creating are just react components, you can use props just as you would in any other react app. Notice how we pass the brightness and color props in to the light to configure it. You can do this with any parameter.

## Setting the Stage

Before we continue on with our lighting, let's add a floor and a backdrop plane to our scene to help give us an impression of the three dimensional space we are working in.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
// highlight-start
// Geometry
function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
// highlight-end

function Sphere() {
  return (
    <mesh
      visible
      userData={{ test: "hello" }}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <KeyLight brightness={10} color={"white"} />
      <Sphere />
      <BackDrop />
      <GroundPlane />
    </Canvas>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

In this step we add two more meshes, this time instead of using `sphereGeometry`, we use `planeBufferGeometry`. Other than that it looks exactly similar to when we created the sphere. Also notice we set a position prop on the FloorPlane to move it below our sphere, and on the `BackDrop` we both set a position to move it behind the sphere, but also set a rotation prop to turn the plane upright. The FloorPlane does not need a position because thee default works fine as a floor to our scene. The `args` passed to the `planeBufferGeomeetry` are the size on the x and y axis represented as a two item array.

## Finishing our Three Point Lighting Setup

Now that we have a stage for our sphere, we can complete our lighting setup by adding some more lights. We are going to create a three point lighting rig which consists of a key light (the main light that casts strong light on the focus of our scene and creates strong shadows), a fill light(a dimmer light on the flip side of the key light, used to fill in the shadows from the key light somewhat and create a more appealing gradient of shades), and a rim light (a bright light behind the subject to create an exciting highlight around the edge and help separate the subject from the background).

```javascript
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

// Geometry
function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function Sphere() {
  return (
    <mesh
      visible
      userData={{ test: "hello" }}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}
// highlight-start

// Lights
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}

function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}

function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}

// highlight-end

function App() {
  return (
    <Canvas className="canvas">
      <GroundPlane />
      <BackDrop />
      // highlight-start
      <KeyLight brightness={5.6} color="#ffbdf4" />
      <FillLight brightness={2.6} color="#bdefff" />
      <RimLight brightness={54} color="#fff" />
      // highlight-end
      <Sphere />
    </Canvas>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Creating the second and third light is precisely the same as creating the first light. Except we have moved the three lights into positions around the sphere. They all use `lookAt` to ensure they are pointed facing the sphere which we created at `[0,0,0]` They also have different `intensity` and `color` so that they can serve their purpose as a fill and rim light. Try playing with these values to create different effects and looks. Move the position to see how the coordinate system works in 3d space. You can see how the lights move in relation to the ground plane and backdrop.

## Completed Tutorial

<iframe
 src="https://codesandbox.io/embed/three-point-lighting-in-react-three-fibers-52bnw?fontsize=14&hidenavigation=1&theme=dark"
 style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
 title="Three Point Lighting in React Three Fibers"
 allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
 sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
 ></iframe>

## Next Steps

A setup like this results in a gentle lighting gradient across our sphere, but you might notice that there are no shadows cast by any of the lights. The rectAreaLight in three.js has a limitation which prevents it from casting shadows, while other light types like the spotLight can, they do not result in the realistic shading we can achieve with rectAreaLights. In a future post, we will explore some tricks we can use to add shadows to our scene.
