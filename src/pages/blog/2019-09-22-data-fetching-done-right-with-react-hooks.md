---

templateKey:  blog-post
title:  Data Fetching Done Right with React Hooks
date:  2019-09-22T21:02:20.866Z
featuredpost:  false
author:  Stephen Castle
authorimage:  /img/contributors/stephen.jpg
featuredimage:  /img/blog-images/helloworld.jpg
description:  >-
A review of the current best methods and libraries for fetching data in modern React with hooks.
tags:
- programming
- javascript
- React
- intermediate
---
So now that hooks are the preferred way of doing just about everything in React, how should you be fetching your data and working with APIs in a React component? In the past, we put our data fetching code in the  `componentWillMount` lifecycle method. When we use hooks, we are working outside the concept of lifecycle methods and need a new way to organize our code. We'll take a look at some of the benefits, challenges, and pitfalls involved in moving our data fetching logic to hooks.

  

## What we want out of a data fetching solution?
Simple data fetching is pretty straight forward. In the simplest case, you can call fetch and get back JSON. For a robust data fetching solution, there are several issues we would like to consider and address if possible.

### Error Handling
We want our data fetching solution to handle error responses gracefully. We would also like the developer experience when writing error processing code to be as pain-free as possible.

### Cross Browser Support
It's a good idea to make sure whatever data fetching solution you choose works for all of the platforms you need it support. For example, the browser fetch API is not supported by IE11.

### Request Cancellation
If a request is no longer needed because say we navigated away from a route where we were awaiting a data fetching response. We want to be able to cancel the request and avoid waiting when we no longer need to.

### Response Caching
We should be able to have some policy for avoiding duplicate requests and instead fulfill them from a local cache.

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

### Write your data fetching hook with the useEffect hook

### React-Fetching-Library