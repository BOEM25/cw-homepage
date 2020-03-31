---
templateKey: blog-post
title: Understanding the React useEffect Hook
date: 2020-03-30T21:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/useeffect.jpg
description: >-
  Let's break down a minimal example of the useEffect hook to understand the most important parts.
tags:
  - programming
  - javascript
  - beginner
  - gamedev
  - react
  - hooks
  - tutorials
---

The useEffect hook is one of the most important hooks you will need to use when working on a modern react app. It allows you to execute code that responds to changes in the state and props of a component and execute important actions like fetching data, or calling browser APIs. Previously a lot of the code we now want to put in to React lifecycle methods in class components goes into a useEffect hook. However, useEffect does not exactly follow the same rules as convetional life cycle methods so it's important to understand how and when the parts of useEffect are executed before you start using it.

## A Minimal Viable Example

<iframe
     src="https://codesandbox.io/embed/rjrxjn3nvp?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Simple demo of useEffect hook"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

In this example we can explore the various parts of `useEffect` and see how we can control when in the life of our component the code will run. This demo contains a component that has three pieces of state, a `page` id, and a `hasDuck` boolean, and a pageTitle that we don't know yet because it's stored on the server. In our example we want to fetch the page title from the server with `useEffect` but only when the `page` state changes. There is also a toggle to hide and show the component that demonstrates what happens when the component is unMounted and mounted. This way we can watch how useEffect behaves during both state changes, and component creation and destruction.

Feel free to explore the completed example a bit, in the next step we will deconstruct it and build it back up one piece at a time.

## The EffectCallback Function

Let's right our first useEffect hook, just focus on the highlighted code. You can ignore the boilerplate for mounting and unmounting our component, we will use this later to monitor how our useEffect hook behaves. I recommend starting from the starter sandbox if you want to follow along with the same css styles and boilerplate. [Start Here](https://codesandbox.io/s/demo-of-useeffect-hook-starting-point-9c0yk)

```javascript
  // highlight-start
import React, { useEffect, useState } from "react";
  // highlight-end
import ReactDOM from "react-dom";

import "./styles.css";

const ComponentWithEffects = () => {
  // highlight-start
  useEffect(() => console.log("Ran effect function."));
  // highlight-end
  return (
    <div className="App">
      <h1>Title</h1>
      <h2>Open the console to see when the parts of useEffect run.</h2>
      <h3>
      <div />
    </div>
  );
};

function App() {
  const [rendered, setRendered] = useState(true);
  return (
    <>
      <button onClick={e => setRendered(!rendered)}>
        {rendered ? "UnMount" : "Render"}
      </button>
      {rendered && <ComponentWithEffects />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

This is the simplest possible use of `useEffect`. We import it at the top from `react` and use it by calling the `useEffect` function at the top of our functional component before the return statement. It takes one parameter, a function to run. Right now we are creating a console log just to prove to ourselves that this code runs one time when the component first mounts. Click the mount and unmount button and watch the console to see when the function runs.

Now let's use the effect to set the title on our page. To do that we also need somewhere to store the title, so let's create some state.

```javascript
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ComponentWithEffects = () => {
  const [title, setTitle] = useState(null);
  useEffect(() => {
    setTitle("Home Page");
  });
  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>Open the console to see when the parts of useEffect run.</h2>
      <h3>
        Note how only changing the page value causes the useEffect callback to
        run. Click change random thing and observe the component re-render, but
        not call useEffect function.
      </h3>
      <label>Shop</label>
      <div />
    </div>
  );
};

function App() {
  const [rendered, setRendered] = useState(true);
  return (
    <>
      <button onClick={e => setRendered(!rendered)}>
        {rendered ? "UnMount" : "Render"}
      </button>
      {rendered && <ComponentWithEffects />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

So this seems to work, but you will get a warning message that looks something like this.
![Error Message.](/img/blog/images/error-message.png) Let's address that next.

## The Dependency Array

The source of our error message is that by default the function we pass to useEffect will be run every time the component renders. This means every time state changes. So you can see why setting state inside of the effect is dangerous... It would be very easy to put ourselves in an infinite loop where we change state, run the effect, which changes state again, forever. The only reason our code works right now is we set the state to the same thing and React is smart enough not to update. So how do we protect ourselves from this? The useEffect hook accepts a second parameter, an array. The hook will then only run if an item in this array has changed, which also means that if we pass an empty array it will never run on state changes, only on the initial component mount.

```js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ComponentWithEffects = () => {
  const [title, setTitle] = useState(null);
  useEffect(() => {
    setTitle("Home Page");
  }, []); //highlight-line
  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>Open the console to see when the parts of useEffect run.</h2>
      <h3>
        Note how only changing the page value causes the useEffect callback to
        run. Click change random thing and observe the component re-render, but
        not call useEffect function.
      </h3>
      <div />
    </div>
  );
};

function App() {
  const [rendered, setRendered] = useState(true);
  return (
    <>
      <button onClick={e => setRendered(!rendered)}>
        {rendered ? "UnMount" : "Render"}
      </button>
      {rendered && <ComponentWithEffects />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

This takes care of our error message, but this is pretty useless. We just hard coded the page title and set it on mount. What we really want to acheive is to fetch the page title from the server when the component state changes. Let's add some more state to represent the current page we want the title for, and some UI to control that state.

```javascript
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ComponentWithEffects = () => {
  const [page, setPage] = useState("home"); // highlight-line
  const [title, setTitle] = useState(null);
  useEffect(
    // highlight-start
    // First param is a function that runs on mount and updates.
    () => {
      console.log("Ran the effect function.");
      fetch("/api.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          console.log(results);
          setTitle(results.page[page].title);
        });
      // highlight-end
    },
    // Don't run the function in the first param unless this value changes.
    [page]
  );
  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>Open the console to see when the parts of useEffect run.</h2>
      <h3>
        Note how only changing the page value causes the useEffect callback to
        run. Click change random thing and observe the component re-render, but
        not call useEffect function.
      </h3>
      // highlight-start
      <input
        type="radio"
        name="page"
        value="home"
        onClick={e => setPage("home")}
      />
      <label>Home</label>
      <input
        type="radio"
        name="page"
        value="shop"
        onClick={e => setPage("shop")}
      />
      <label>Shop</label>
      // highlight-end
      <div />
    </div>
  );
};

function App() {
  const [rendered, setRendered] = useState(true);
  return (
    <>
      <button onClick={e => setRendered(!rendered)}>
        {rendered ? "UnMount" : "Render"}
      </button>
      {rendered && <ComponentWithEffects />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

So this is nice, now when the page id changes we get a new title from the api. In the real world this id could come from a page slug, or a prop. The important thing is we are able to run some side effect code in response to a value changing. We could put more logic or functionality into our effect callback if we needed to handle other things when the pageName value changes.

What if we had state other than our page name? We probably don't need to refetch the title unless the page name changes. Let's add a `hasDuck` toggle. hasDuck just gives our component a cool duck, we don't need to check for a page title when this value changes.

```javascript
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ComponentWithEffects = () => {
  const [page, setPage] = useState("home");
  const [title, setTitle] = useState(null);
  const [hasDuck, sethasDuck] = useState(true); // highlight-line

  useEffect(
    // First param is a function that runs on mount and updates.
    () => {
      console.log("Ran the effect function.");
      fetch("/api.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          console.log(results);
          setTitle(results.page[page].title);
        });
      // Function returned by the first param is run on every re-render and component unmount.
      return () => console.log("Ran clean up function.");
    },
    // Don't run the function in the first param unless this value changes.
    [page]
  );
  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>Open the console to see when the parts of useEffect run.</h2>
      <h3>
        Note how only changing the page value causes the useEffect callback to
        run. Click change random thing and observe the component re-render, but
        not call useEffect function.
      </h3>
      <input
        type="radio"
        name="page"
        value="home"
        onClick={e => setPage("home")}
      />
      <label>Home</label>
      <input
        type="radio"
        name="page"
        value="shop"
        onClick={e => setPage("shop")}
      />
      <label>Shop</label>
      <div />
      // start-highlight
      <div>
        <button onClick={e => sethasDuck(!hasDuck)}>Toggle Duck</button>
        {hasDuck && (
          <span role="img" aria-label="duck">
            🦆
          </span>
        )}
      </div>
      // end-highlight
    </div>
  );
};

function App() {
  const [rendered, setRendered] = useState(true);
  return (
    <>
      <button onClick={e => setRendered(!rendered)}>
        {rendered ? "UnMount" : "Render"}
      </button>
      {rendered && <ComponentWithEffects />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

So looking at the console what happens when we toggle the hasDuck state? Hopefully you do not see the console log indicating our data fetching has occured. What if you add hasDuck to the array right next to pageTitle? This is how we control when useState executes. Here we are only passing state references, but these could also be (and often are) component props.

## Cleaning up

So two final things to wrap up. Let's look at how we could refactor this into a reusable custom hook. And also see one final feature of useEffect.

```js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const useServerTitle = () => {
  const [page, setPage] = useState("home");
  const [title, setTitle] = useState("Fetching title.");
  const [hasDuck, sethasDuck] = useState(true);
  useEffect(
    // First param is a function that runs on mount and updates.
    () => {
      console.log("Ran the effect function.");
      fetch("/api.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          console.log(results);
          setTitle(results.page[page].title);
        });
      // Function returned by the first param is run on every re-render and component unmount.
      return () => console.log("Ran clean up function."); //highlight-line
    },
    // Don't run the function in the first param unless this value changes.
    [page]
  );
  return [title, setPage, hasDuck, sethasDuck];
};

const ComponentWithEffects = () => {
  const [title, setPage, hasDuck, sethasDuck] = useServerTitle(); // highlight-line
  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>Open the console to see when the parts of useEffect run.</h2>
      <h3>
        Note how only changing the page value causes the useEffect callback to
        run. Click change random thing and observe the component re-render, but
        not call useEffect function.
      </h3>
      <input
        type="radio"
        name="page"
        value="home"
        onClick={e => setPage("home")}
      />
      <label>Home</label>
      <input
        type="radio"
        name="page"
        value="shop"
        onClick={e => setPage("shop")}
      />
      <label>Shop</label>
      <div>
        <button onClick={e => sethasDuck(!hasDuck)}>Toggle Duck</button>
        {hasDuck && (
          <span role="img" aria-label="duck">
            🦆
          </span>
        )}
      </div>
    </div>
  );
};

function App() {
  const [rendered, setRendered] = useState(true);
  return (
    <>
      <button onClick={e => setRendered(!rendered)}>
        {rendered ? "UnMount" : "Render"}
      </button>
      {rendered && <ComponentWithEffects />}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Try clicking the mount and unmount button now, and how about changing the page title and hasDuck toggle? You should see a second console log that says `Ran clean up function.`. This is another feature of `useEffect` you can return a function from your effect callback. This function gets run when the component is destroyed or when the useEffect hook is rerun to set it in a clean initial state, and is very useful for certain types of effects, you could use it to cancel api requests, or to clean up event listeners you may have registered in your useEffect hook. This is a contrived example but I hope it at least helps you see when this function runs.

The final thing I hope this tutorial helps drive home is how powerful combining simple hooks can be and all the different things you can do with just a few `useState` and `useEffect` hooks. If you learn how to wire and package them together effectively you can create some really useful reuseable behavior to embed in any of your components. For more information as always it's worth while to read the [official react docs.](https://reactjs.org/docs/hooks-reference.html#useeffect)
