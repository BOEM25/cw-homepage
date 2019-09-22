---
templateKey:  blog-post
title:  Data Fetching With React Hooks Done Right 
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


<iframe  src="https://codesandbox.io/embed/list-detail-react-app-template-y8lb2?fontsize=14"  title="List - Detail React App Template"  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Using useEffect and useState hooks to write your own data fetching

### Using the React-Fetching-Library
Writing your own data-fetching solution is a great way to learn about hooks, and understand some of the implications that arise when fetching data from an API in react.
It's also an incredibly common need in a web application and so there are a number of great libraries out there that you might be better off using than writing your own.