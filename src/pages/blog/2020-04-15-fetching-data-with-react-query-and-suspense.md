---
templateKey: blog-post
title: Fetching Data with react-query and Suspense
date: 2020-04-15T01:02:20.866Z
featuredpost: false
published: true
author: Lisa Myers
authorimage: /img/contributors/placeholder.jpg
featuredimage: /img/blog-images/react-query.jpg
description: >-
  Learn how to effectively work with APIs and fetch data using react-query to gain world class caching and other advanced data loading features.
tags:
  - programming
  - javascript
  - intermediate
  - react
  - hooks
  - react-query
  - tutorials
---

React Query is probably the best way that currently exists to effectively manage API requests in a React app. It contains elegant solutions for all of the common issues that arise when fetching data. From caching, to cancellation, to pagination, it's a great tool to utilize any time you need to asynchronously request data in your react app. One of the really great things about it is that it is unopinoninated about how you fetch the data. Anything you can write as a function returning a promise can be used by react-query to load data, and it will take care of the rest.

## Goals of this Tutorial

In this tutorial we will break down the following example which uses react-query to fetch both a list of Pokemon, and some detail about specific Pokemon, from the Pokemon mock API. In a [previous tutorial](https://http://localhost:8000/blog/2019-09-22-data-fetching-with-react-hooks-part-1/) we built the same thing using our own useEffect hook and useState hook. Here we will start from the end point of that tutorial and rewrite it to use react-query so that we can add some of the more advanced featured it provides.

<iframe
     src="https://codesandbox.io/embed/advanced-data-fetching-in-react-with-react-query-v604e?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Advanced Data Fetching in React with react-query"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Initial Setup and Using with React Suspense

Let's start by setting up react-query to use suspense. By default it does not because you need to be using the experimental release of react, but we can easily turn it on.

```js
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ReactQueryConfigProvider } from "react-query"; //highlight-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./List";
import Detail from "./Detail";
import "./styles.css";

const Loader = () => <div>Loading</div>;

// highlight-start
const queryConfig = {
  suspense: true,
};
// highlight-end
function App() {
  return ({/* highlight-start*/}
    <ReactQueryConfigProvider config={queryConfig}>
{/* highlight-end*/}
      <Suspense fallback={<Loader />}>
        <Router className="App">
          <Route exact path="/" component={List} />
          <Route path="/:id" component={Detail} />
        </Router>
      </Suspense>
    </ReactQueryConfigProvider> // highlight-line
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

The first thing we need to do is add the `ReactQueryConfigProvider` to our index.js file and wrap our entire app with it. We do this to provide global configuration to all of the queries that we will write later. React Query will work without this, but if you do want to set some global settings and not have to reconfigure every request it's a good idea to do this here. In our case we want to use suspense mode with all our queries so we turn that on here in the queryConfig object.

## Writing our first Query to Fetch the List of Pokemon

We can implement react-query with just two lines. Import `useQuery`, and then in our List component use it as shown below. After you get it working and you see a list of Pokemon we'll talk about what's happening here.

```js
import React from "react";
import { getPokemonList } from "./queries";
import { useQuery } from "react-query"; // highlight-line
import { Link } from "react-router-dom";

function List() {
  const { data, error } = useQuery("pokemon", getPokemonList, {}); // highlight-line

  // Short circut if there is an error state and return.
  if (error) {
    return <div>There was an Error</div>;
  }

  return (
    <div className="container">
      <ul className="list">
        {data.results.map((item) => (
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

useQuery takes 3 arguments, a string to use as a unique key for the cache, an async function to use to load data, and a settings object.

and it returns an object containing lots of useful data and methods. Right now we just have our data and an error value we can check for errors.

Here is a complete list of values returned in this object for reference.

Let's look at the getPokemonList function in queries.js that we are using to actually fetch the data.

```js
// queries.js
import axios from "axios";

//highlight-start
const getPokemonList = async () => {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return data;
};
//highlight-end
const getPokemonDetail = async (key, { id }) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return data;
};

export { getPokemonDetail, getPokemonList };
```

It's just a normal async javascript function, nothing special about it. This is one of the great powers of react-query. Anything that can be represented as an async function can be used as a data loader.

## Adding our second Query to Get Details of a Specific Pokemon

Next let's edit the Details component to fetch data on the specific pokemon we are viewing. This query is a little different mainly because we need to pass the pokemon ID to useQuery.

```js
import React from "react";
import { useQuery } from "react-query";
import { getPokemonDetail } from "./queries";
import { Link } from "react-router-dom";

function Detail({
  match: {
    params: { id },
  },
}) {
  // pass query name and params for query in the first param, these will all be provided to the getPokemonDetail function.
  const { data } = useQuery(["project", { id }], getPokemonDetail);

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

Just like last time let's check out the async function we provided to fetch the data. In this function there are some clues to how react-query handles parameters.

```js
// queries.js
import axios from "axios";

const getPokemonList = async () => {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return data;
};

const getPokemonDetail = async (key, { id }) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return data;
};

export { getPokemonDetail, getPokemonList };
```

Notice that the function receives a value called key, and then an object which contains the id. These come from react-query when it calls the function.

Remember how we originally setup useQuery when we used getPokemonDetail?

```js
const { data } = useQuery(["project", { id }], getPokemonDetail);
```

React Query has made the key array (the first parameter of useQuery) available inside `getPokemonDetail` as function params. In theory we could have provided multiple values and react-query would have handled updating when any of them changed. React Query also uses all of these to know when it needs to refetch data or invalidate the cache. Since if they change it is assumed we want to rerun the query with new values.

## Next Steps

React Query has many more features, you can find out more about them by visiting the [official library documentation](https://www.npmjs.com/package/react-query), or in a future article where we will cover them more in depth.
