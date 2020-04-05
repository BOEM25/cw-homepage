---
templateKey: blog-post
title: Adding OrbitControls to React Three Fiber
date: 2020-04-03T01:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/orbit-controls.jpg
description: >-
  An example of adding OrbitControls to a react-three-fiber scene. Part two in the SpaceFox series.
tags:
  - programming
  - javascript
  - intermediate
  - gamedev
  - react
  - react-three-fiber
  - Three.js
  - libraries
  - tutorials
---

## Orbit Controls

Three.JS has an import we can use called [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) that adds a lot of free camera movement functionality. It is very configurable and can do some cool stuff like restrict the maximum angle of rotation, allow or disallow zooming, and lock focus on to a specific object. Let's implement it in our scene now to use as a basis for later camera controls in our game.

<iframe
     src="https://codesandbox.io/embed/react-fox-a-react-three-fiber-scene-part-two-orbit-controls-7c11y?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React Fox : A React Three Fiber Scene Part Two - Orbit Controls"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Importing OrbitControls and Using React Three Fiber Extend

In react-three-fiber we use Three.js objects as if they were React components. Many of those components are already available to us automatically. Like the `sphereGeometry` and `meshStandardMaterial` we have used previously. However, there are many objects in Three.js that are not automatically available as a component. Luckily the react-three-fiber API provides us with a way to add them via a function called extend. In the react-three-fiber docs, it describes it like this.

> The extend function extends three-fibers catalog of known native JSX elements.

This is exactly what we want to do with OrbitControls, and to do so is pretty straightforward. Just import OrbitControls directly from Three.js, then import extend from react-three-fiber. And then call extend by passing in an object literal containing OrbitControls. You could pass more than one thing in to extend, and we will do so later.

```javascript
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles.css";

// highlight-start
// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });
// highlight-end

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <>
      <Canvas style={{ background: "white" }}>
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
      </Canvas>
      <a
        href="https://codeworkshop.dev/blog/2020-04-04-adding-orbit-controls-to-react-three-fiber/"
        className="blog-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog Post
      </a>
    </>
  );
}
```

## Initializing OrbitControls

Once we have imported and extended OrbitControls, we can use it in a component like this. And then add it to our scene.

```javascript
import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  useFrame, // highlight-line
  extend,
  useThree, // highlight-line
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles.css";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

// highlight-start
const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();

  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};
// highlight-end

export default function App() {
  return (
    <>
      <Canvas style={{ background: "white" }}>
        <CameraControls /> // highlight-line
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
      </Canvas>
      <a
        href="https://codeworkshop.dev/blog/2020-04-04-adding-orbit-controls-to-react-three-fiber/"
        className="blog-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog Post
      </a>
    </>
  );
}
```

Let's break down what we just did in that last step. There are three important parts.

> ### Using the useThree Hook to get a reference to the Three.JS Camera and Canvas Element
>
> To add OrbitControls we need a reference to the Three.js camera and canvas element when creating the component.
> To get these react-three-fiber provides the `useThree` hook, this is an escape hatch into getting access to core Three.js elements.
>
> ```js
> const {
>   camera,
>   gl: { domElement },
> } = useThree();
> ```

> ### Initializing the Orbit Controls
>
> Once we have those, we can create the OrbitControls using orbitControls JSX element, which has been made available to us from earlier when we called `extend()`.
> You could try removing the line with extend and check the error to see what would have happened if we hadn't done that first.
> Something worth noticing here is that the args array provided to the JSX elements in react-three-fiber are always the parameters required to initialize a native object in Three.JS. [OrbitControls](https://threejs.org/docs/#examples/en/> controls/OrbitControls)
>
> Getting used to the mapping between Three.js docs and their equivalent component API happens over time as you work with it.
>
> ```js
> <orbitControls args={[camera, domElement]} />
> ```

> ### Plugging The Orbit Controls into the render loop with useFrame
>
> In order for our orbit controls to be updated on every animation frame, we need to call `controls.current.update()` in the render loop. Any time you need some code to run in the render loop in react-three-fiber we use the useFrame hook. > In this case, since we want to call a method on OrbitControls, we also need to add a ref, and then we can call the update method.
>
> ```js
> // Ref to the controls, so that we can update them on every frame using useFrame
> const controls = useRef();
>
> useFrame((state) => controls.current.update());
> ```

## Configuring OrbitControls

At this point you should be able to click and drag your mouse to rotate around the ship. But what if we want to restrict the rotation so that we stay behind the ship, and also turn off zooming with the scroll wheel. To access all the options of OrbitControls you can set them as props on the orbitControls component like this.

```js
import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles.css";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false} // highlight-line
      maxAzimuthAngle={Math.PI / 4} // highlight-line
      maxPolarAngle={Math.PI} // highlight-line
      minAzimuthAngle={-Math.PI / 4} // highlight-line
      minPolarAngle={0} // highlight-line
    />
  );
};

export default function App() {
  return (
    <>
      <Canvas style={{ background: "white" }}>
        <CameraControls />
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
      </Canvas>
      <a
        href="https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/"
        className="blog-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog Post
      </a>
    </>
  );
}
```

## Coming Up in Part Three

In Part Three we will start building something that really feels like a game. We will add movement controls to our ship, and create some procedurally generated terrain to fly through.
