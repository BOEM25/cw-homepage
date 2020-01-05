---
templateKey: blog-post
title: Automating the DJI Tello Drone with GO
date: 2019-12-31T21:02:20.866Z
featuredpost: false
published: false
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/three-point-lighting.jpg
description: >-
  React three fiber is a powerful library allowing you to leverage the awesome declarative UI model of React to create Three.JS WebGL scenes.
tags:
  - programming
  - beginner
  - go
  - robotics
  - drones
  - tutorials
---

## Using the Gobot Library to control physical devices

## First Flight: Taking off and Landing

Let's write our first program to control the Tello. We will start simple by initiating a take off, waiting 5 seconds and then landing again.

```go
  package main

  import (
    "fmt"
    "time"

    "gobot.io/x/gobot"
    "gobot.io/x/gobot/platforms/dji/tello"
  )

  func main() {
    // Connect to the Tello and store an instance of the connection to a variable.
    // You can use this variable to issue commands to your drone.
    drone := tello.NewDriver("8888")

    work := func() {
      drone.TakeOff()

      gobot.After(5*time.Second, func() {
        drone.Land()
      })
    }

    robot := gobot.NewRobot("tello",
      []gobot.Connection{},
      []gobot.Device{drone},
      work,
    )

    robot.Start()
  }
```

## Flying around

## Stunt Flying: Do a Barrell Roll
