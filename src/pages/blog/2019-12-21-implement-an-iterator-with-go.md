---
templateKey: blog-post
title: Implement an Iterator with GO
date: 2019-12-21T21:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/iterators.jpg
description: >-
  Write an iterator in Go using interfaces.
tags:
  - programming
  - intermediate
  - go
  - practice problems
  - tutorials
---

Writing an iterator implementation is a common coding challenge.  Let's look at a way we could do that using GO. Below is the simplest possible implementation just to get things started. Then we can add some simple features to it as we go.

```go
package main

import (
	"fmt"
)


// Create a Counter type
// that we can later implement Iterator interface on.
type Counter struct {
	Value int
}

// Iterator interface requires one method with no params
// and no return value.
type Iterator interface {
	next()
}


// Implementing the Iterator interface on Counter.
// calling next will mutate Value and add one.
func (c *Counter) next() {
	c.Value++
	return c
}


func main() {
	counter := Counter{Value: 0}
	counter.next()
	// Wow Counter.Value is now 1. Hoorray.
	fmt.Println(counter)
}
```

Another example, this time with a second type called Doubler implementing Iterator
 to demonstrate the usefulness of the Interface.

```go
package main

import (
	"fmt"
)

// Create a Counter type
// that we can later implement Iterator interaface on.
type Counter struct {
	Value int
}

// Create a Doubler type
// that we can later implement Iterator interaface on.
// With a different behavior from Counter.
type Doubler struct {
	Value int
}

// Iterator interface requires one method with no params
// and no return value.
type Iterator interface {
	next()
}

// Implementing the Iterator interface on Counter.
// calling next will mutate Value and add one.
func (c *Counter) next() {
	c.Value++
}

// Implementing the Iterator interface on Doubler.
// calling next will mutate Value and double it.
func (c *Doubler) next() {
	c.Value = c.Value * 2
}

// Iterate function that can iterate any iterator
// We can use this on Doubler or Counter or any future type we implement next() on
func iterate(i Iterator) {
	i.next()
}

func main() {
	counter := Counter{Value: 0}
	doubler := Doubler{Value: 2}
	// You need to pass a pointer because next()
	// has a pointer receiver.
	iterate(&counter)
	fmt.Println(counter)
	iterate(&doubler)
	fmt.Println(doubler)
}
```

Now what if we wanted to chain calls to next for some reason? We
can make the `next()` method on interface return an `Iterator`.
Then update the implementation to return its self.

```go
package main

import (
	"fmt"
)

// Create a Counter type
// that we can later implement Iterator interaface on.
type Counter struct {
	Value int
}

// Create a Doubler type
// that we can later implement Iterator interaface on.
// With a different behavior from Counter.
type Doubler struct {
	Value int
}

// Iterator interface requires one method with no params
// To have types calling next() return themselves
// we can have a method signature that returns an Iterator..
// Even from inside the interface definition.
type Iterator interface {
	next() Iterator
}

// Implementing the Iterator interface on Counter.
// calling next will mutate Value and add one.
// It will now also return its self cast as an Iterator.
func (c *Counter) next() Iterator {
	c.Value++
	return c
}

// Implementing the Iterator interface on Doubler.
// calling next will mutate Value and double it.
// It will now also return its self cast as an Iterator.
func (c *Doubler) next() Iterator {
	c.Value = c.Value * 2
	return c
}

// Iterate function that can iterate any iterator
func iterate(i Iterator) Iterator {
	// Now we can chain calls to next.
	i.next().next()
	return i
}

func main() {
	counter := Counter{Value: 0}
	doubler := Doubler{Value: 2}
	// You need to pass a pointer because next()
	// has a pointer receiver.
	iterate(&counter)
	fmt.Println(counter)
	// next also works on the return value of iterate
	// because it is also an Iterator
	iterate(&doubler).next()

	// Notice the output for doubler has been doubled
	// three times. Twice inside the iterator function
	// and once more when we chained a call to its return value.
	fmt.Println(doubler)
}

```