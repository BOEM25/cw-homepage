---
templateKey: blog-post
title: Fetching Data with React Hooks
date: 2019-09-22T21:02:20.866Z
featuredpost: false
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/helloworld.jpg
description: >-
  A review of the current best methods and libraries for fetching data in modern React with hooks.
tags:
  - programming
  - javascript
  - React
  - intermediate
---

When hooks were released last year they shook up a lot of the best practices and API design patterns that the React
community had been relying on for years.  Having a whole new way to compose reuseabule functionality in our components
opened the doors to new ways of writing the core functionality of our React web applications.  One of the features
that the vast majority of applications have to consider is how they are going to fetch data from other services or API endpoints.
So now that hooks are the preferred way to do this, what is the best way forward?

## What we want out of a data fetching solution?
Simple datafetching has always been pretty easy. At the simplest you could just call fetch and get back json. But for a robust data fetching solution there
are a number of issues we would like to consider and address if possible.

### Error Handling
We would like our data fetching solution to gracefully handle error responses. We would also like the developer experience when writing error handling code
to be as pain free as possible.

### Request Cancellation
If a request is no longer needed, because say we navigated away from a route where we were awaiting a data fetching response. We would like to be able to cancel the request to avoid unnecesairy overhead.

### Response Caching
Sometimes when navigating through a web app we have already fetched the data we need to fulfill the rendering of a page, we should be able to have some policy for avoiding duplicate requests and instead
fulfilling them from a local cache.

### Support for React Suspense
React Suspense is a convenient way to render placeholder components while awaiting the results of some data fetching operation or other promise to be fulfilled. We would like our data fetching solution
to play nicely with this feature of React.

### Server Side Rendering Support
When rendering a ReactJS app on the server React will have to execute your data fetching calls in a node environment.  We should choose a solution that works well both on the server and in the browser.

### Small Bundle Impact
If we use a library for our data fetching it would be best if it doesn't add very much to our overall javascript payload.

## So what our our options for data fetching with React hooks?

### Build your own

### React-Fetching-Library