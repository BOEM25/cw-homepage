---
templateKey: blog-post
title: The Array Reduce Method in Javascript
date: 2019-12-16T21:02:20.866Z
featuredpost: false
published: false
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/reduce.png
description: >-
  A quick five minute introduction to the very important reduce method in javascript.
tags:
  - programming
  - javascript
  - quick bytes
---

An array is one of the most important data types in any programming language, and in javascript it's no exception. Because we spend so much time using arrays Javascript features many powerful methods on the Array prototype for manipulating them. One of the most useful is called the `reduce` method. A `reduce` is used when you want to take an array, process each item in that arrray, and return a single value of any other type. Let's take a look at how that works. We can write a simple reduce to take an array and sum all of the items inside of it.

```javascript
const myArr = [1, 2, 3, 4, 5];
myArr.reduce((acc, x) => acc + x, 0);
```

In the above code you can see that `reduce` is called by adding `.reduce` following the array, this is because it is a method on the array type so you can do this on any array you have created in Javascript. The reduce method takes two paramaters, a callback function to run on each item in the array, and an initial value. The callback function takes two paramaters as well, an accumulator which is the return value of the previous iteration (or the initial value on the first run), and the second parameter is the current value in the array. Try this yourself by changing the code below to multiply all of the items instead of adding them. What happens if you change the initial value from 0 to 1?

<iframe height="400px" width="100%" src="https://repl.it/@xxtracerxx/WoozyAdvancedEmulation?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Now let's try a more complex example. That's pretend we have a list that looks like this.

```javascript
const students = [
  { name: "john", finalExamGrade: 90 },
  { name: "mary", finalExamGrade: 95 },
  { name: "rebecca", finalExamGrade: 92 }
];
```

Now let's assume we would like to be able to look up our students by name and get their grade. The way we have our data now, we would need to loop through the whole array and check each students name until we found a match. This is probably ok with only three students, but what if there were millions? It would be much better if our data was a key value object like this.

```javascript
const studentScores = {
  john: 90,
  mary: 95,
  rebecca: 92
};
```

Now we can just write studentScores['mary'] and get the score without having to loop through the whole array every single time we want to get a score. So how do we get from our list to data that looks like this? Since we are transforming a list into a single output object, this is an ideal time to use our reduce method again.

```javascript
const students = [
  { name: "john", finalExamGrade: 90 },
  { name: "mary", finalExamGrade: 95 },
  { name: "rebecca", finalExamGrade: 92 }
];

const studentScores = students.reduce(
  (acc, student) => ({ ...acc, [student.name]: student.finalExamGrade }),
  {}
);
```

That's all it takes. Notice our reduce function continuously uses the acc value to construct an object with each student name as a key, and their score as the value of that key. Also note that we use an initial value in the second parameter to reduce of an empty object, this way on the first student the value of acc is already an object and available to assign a new key to.

Try it out below. For extra credit, what if two students had the same name? Could you improve our reduce callback function to handle such a case? Give it a shot, it might be easier than you think.

<iframe height="400px" width="100%" src="https://repl.it/@xxtracerxx/Reduce-Example?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
