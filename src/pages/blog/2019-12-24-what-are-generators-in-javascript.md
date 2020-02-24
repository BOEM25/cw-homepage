---
templateKey: blog-post
title: What are generators in Javascript?
date: 2019-12-27T21:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/generators.jpg
description: >-
  Learn what generators are and how to use them.
tags:
  - programming
  - intermediate
  - javascript
  - es6
  - tutorials
---

A generator is a feature in modern es6 Javascript that has been around for a while in other languages. They are a way to create iterable objects that have state and can calculate each new item in the series as needed by running some code, as opposed to creating and storing all of the items in an array all at once.

Below is a working example of a generator to create an iterator which can return a series of numbers, with a given step that ends once it reaches a max value. We can break this down to understand each part of creating a generator.

```javascript
function* numbersWithStep(step, max) {
  let number = 0;
  number += step;
  while (number <= max) {
    yield number;
    number = number + step;
  }
}

const generatorInstance = numbersWithStep(2, 10);

console.log(generatorInstance.next());
console.log(generatorInstance.next());

for (let n of numbersWithStep(1, 20)) {
  console.log(n);
}
```

The first part of the example above defines a special type of function with a `*` after the function keyword. This indicates you are creating a generator. The rest of the function declaration looks very similar to a normal function except that it has a yield keyword instead of a return.

```javascript
function* numbersWithStep(step, max) {
  let number = 0;
  number += step;
  while (number <= max) {
    yield number;
    number = number + step;
  }
}
// ...
```

After declaring a generator function, you call that function to initialize it, this will not return any value, but instead return an object ready to start iterating with an initial state, and a `next()` method. Notice that we can pass in params just like a regular function, and looking back at the body of our generator, we can see how they work to set up our new generator instance. Try manipulating these parameters in repl.it to see the effect.

```javascript
//...
const generatorInstance = numbersWithStep(2, 10);
//...
```

Now that we have instantiated a generatorInstance we can use it by calling next.

```javascript
console.log(generatorInstance.next());
console.log(generatorInstance.next());
```

Calling next twice will return two objects that look like this.

```javascript
{ value: 2, done: false }
{ value: 4, done: false }
```

Notice that even though we called the same `next()` method both times, we got two different results? This is because generators have state. `generatorInstance` internally increments the value by the step param every time you call next. Also, note that calling next returns a `value` and a `done` boolean. What would happen to the value of `done` if you called `next()` on `generatorInstance` 5 more times?

The last part of our example demonstrates a handy property of generators. They can be used just like arrays and strings in for loops.

```javascript
for (let n of numbersWithStep(1, 10)) {
  console.log(n);
}
```

Running this will print

```
1
2
3
4
5
6
7
8
9
10
```

Notice how it automatically just prints the value, unlike the `next()` method? And it also ends when it reaches the max value.

Generators are beneficial whenever you want to have a series generated by some code. It also means you can defer calculating a value until you need it. A generator does not create any particular value in its series until you try to access it with `next()` or in an iteration. This behavior is called lazy evaluation. Lazy evaluation is useful for saving memory in a giant list, creating infinite series and many other valuable patterns. Since the items returned by `yield` can be anything, not just numbers, you could even make a network request or access a database on-demand to create your list. Creative usages like these is where generators become truly powerful.

Get a feel for using generators by playing around with our example generator in repl.it. Can you make it infinite? Or maybe create a more exciting series than just numbers with a step?

<iframe height="400px" width="100%" src="https://repl.it/@xxtracerxx/javascript-generators?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>