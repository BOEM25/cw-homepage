---
templateKey:  blog-post
title:  "Data Fetching With React Hooks: Part 1"
date:  2019-09-22T21:02:20.866Z
featuredpost:  false
author:  Stephen Castle
authorimage:  /img/contributors/stephen.jpg
featuredimage:  /img/blog-images/hooks.jpg
description:  >-
    Learn how to write bulletproof data-fetching code for your react app with React hooks. We'll also review some of the most trusted data fetching libraries with hooks APIs.
tags:
    - programming
    - javascript
    - React
    - intermediate
---
How should you be fetching your data and working with APIs in a React component when using React hooks? In the past, we put our data fetching code in the  `componentWillMount` lifecycle method. When we use hooks, we are working outside the concept of lifecycle methods and need a new way to organize our code. We'll take a look at some of the benefits, challenges, and pitfalls involved in moving our data fetching logic to hooks.

If you haven't yet spent any time familiarizing yourself with React Hooks, I would recommend reading up on them a little bit here before continuing with this article. [React Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

## What we want out of a data fetching solution?
Simple happy path data fetching is pretty straight forward. In the simplest case, you can call the browser fetch API, get back JSON and put our data in state somewhere for rendering by our app. The happy path is ok most of the time, but for a robust data fetching solution, there are several additional issues we would like to consider and address if possible.

### Error Handling
We want our data fetching solution to handle error responses gracefully. We would also like the developer experience when writing error path code to be as pain-free as possible.

### Cross Browser Support
It's a good idea to make sure whatever data fetching solution you choose works for all of the platforms you need to support. For example, the browser fetch API is not supported by IE11 without a polyfill.

### Request Cancellation
If a request is no longer needed because say we navigated away from a route where we were still awaiting a response. We want to be able to cancel the request and avoid waiting when we no longer need to.

### Response Caching
We should be able to have some method for avoiding duplicate requests and instead fulfill them from a local cache.

### Support for React Suspense
React Suspense is a convenient way to render placeholder components while awaiting the results of some data fetching operation or other promises to be fulfilled. We want our data fetching solution
to play nicely with this feature of React.

### Server Side Rendering Support
When rendering a ReactJS app on the server React must execute your data-fetching calls in a node environment. We should choose a solution that works well both on the server and in the browser.

### Small Bundle Impact
If we use a library for our data-fetching, it would be best if it doesn't add very much to our overall javascript payload.

## So what are our options for data fetching with React hooks?
Let's take a look at a few different options for fetching data. To keep things simple, we'll start with a basic React app template that has a list view, a detail view, and hardcoded data. Next, we replace the hardcoded data with a few different data-fetching solutions while paying attention to how they meet the needs mentioned above, such as caching and cancellation. 

> You can use this codesandbox.com template to follow along with the code below.

<iframe  src="https://codesandbox.io/embed/list-detail-react-app-template-y8lb2?fontsize=14"  title="List - Detail React App Template"  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



### Using useEffect and useState hooks for data fetching
Now let's go through a simple example of data-fetching using hooks. We can use the awesome [PokéAPI](https://pokeapi.co/) to build a simple application. We can do two things,
request a list of Pokemon from the `List.js` component and then request detailed pokemon information on the `Detail.js` route and display the default sprite for the Pokemon.



#### Importing the dependencices we need.
```javascript
// List.js
// highlight-start
import React, { useState, useEffect } from "react";
import axios from "axios";
// highlight-end
import { Link } from "react-router-dom";
function List() {
  const [data, setData] = useState([]);
  return (
    <div className="container">
      <ul className="list">
        {data.map(item => (
          <li key={item.name} className="list-item">
            <Link to={item.name}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;

```

#### Creating our useEffect hook to fetch data
```javascript
// List.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function List() {
  const [data, setData] = useState([]);
  // highlight-start
  useEffect(() => {
    // We declare an async function scoped inside of the useEffect callback param
    // this is because useEffect callbacks must be syncronous to avoid race conditions.
    async function fetchData() {
      const result = await axios("https://pokeapi.co/api/v2/pokemon");
      console.log(result);
      // Now that our results have returned we can use the useState setter to set our data to be the new results.
      setData(result.data.results);
    }
    fetchData();
    // Notice the second param to the function is [] this means
    // our useEffect hook should only run on initial component load. More on this later
  }, []);
  // highlight-end

  return (
    <div className="container">
      <ul className="list">
        {data.map(item => (
          <li key={item.name} className="list-item">
            <Link to={item.name}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;

```

#### Data Fetching on the Detail Page
Fetching our pokemon details is almost the same as on the previous route, with two minor differences.
We need to get the pokemon id from the route and use it in our API URI. Also, we need to make a change to 
the second parameter in our useEffect hook to update when the id changes.


```javascript
  // highlight-start
import React, { useState, useEffect } from "react";
import axios from "axios";
  // highlight-end
import { Link } from "react-router-dom";
function Detail({
  match: {
    params: { id }
  }
}) {
  const [data, setData] = useState({});
  // highlight-start
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      console.log(result);
      setData(result.data);
      setIsLoading(false);
    }
    fetchData();
    // Notice the difference here from the List.js example. This time since our request is dependent on the value of
    // id, we include it in this array. If it changes, our hook will execute its callback again.
  }, [id]);
  // highlight-end
  return (
    <div className="container">
      <div className="card">
        <h1>ID: {id}</h1>
        <div className="img-container">
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
        <Link to="/">Return to List View</Link>
      </div>
    </div>
  );
}

export default Detail;

```
> Try out the code sandbox below to see the finished example.

<iframe src="https://codesandbox.io/embed/fetching-data-in-react-with-useeffect-and-usestate-6f2u8?fontsize=14" title="Fetching data in react with useEffect and useState" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Handling performance and non-happy path concerns in part 2.
In part 2 of this 3 part series on data fetching using React hooks, we will see how to add error and loading spinner support, handle request cancellation, add suspense support, and implement response caching.