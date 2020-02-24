---
templateKey: blog-post
title: Automating the DJI Tello Drone with GO
date: 2020-02-26T21:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/drone.jpg
description: >-
  You'll be amazed how easy it is to fly a drone with Go and Gobot on your side.
tags:
  - programming
  - beginners
  - go
  - robotics
  - drones
  - tutorials
---

## Using the Gobot Library to control physical devices

To get started, we will need to have Go installed, set up a new project, and install GoBot as a dependency of that project.

### Installing Go

Follow the instructions for your operating system on the Go Getting Started guide to install Go.
https://golang.org/doc/install

### Creating a New Project

Create a new directory, and from inside that directory run `go mod init gobot-project`

### Installing GoBot

From inside your project directory again, run:
`go get go get -d -u gobot.io/x/gobot/...`

### Connecting to the Tello Drone

You will need a Tello drone to follow along with this article, they currently cost about 100 dollars and are a cool little toy to experiment with. If you don't have one though
you can check out some of the many other devices that Gobot can control. https://gobot.io/

If you do have one, connecting to it so that our program can send it commands is as easy as turning on the drone, wait until the light is blue and its in a ready state, and then open the wifi settings on the computer you are using to run the program we will be writing. You should see a wifi network that says something like DJI-TELLO-123. Connect your computer to that wifi network and then you will be ready for your code to take control of the device.

## First Flight: Take off and Landing

Let's write our first program to control the Tello. We will start simply by initiating a takeoff, waiting 5 seconds, and then landing again.

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

Notice what we are doing here. First, we set up the device driver by calling `tello.NewDriver` with a port number and assigning the result to drone.
Next, we declare a function called work; this is where we script out the actions for our drone to perform. Actions are initiated by calling methods on the drone
instance we set up in the first step. To introduce a timed delay, we can use a helper method included with Gobot called `gobot.After`. This function takes two parameters, a time in milliseconds, and a callback to execute after the time has elapsed. In our case, we wait 5 seconds then call `Land()` on our drone to land.

## Flying around

After setting up a takeoff and landing, flying around is just as easy. We just need to use a few new methods available on our drone object.

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
      //highlight-start
      drone.Forward(10)
      drone.Backward(10)
      //highlight-end
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

As a demonstration, we are just going to fly forward ten steps and then fly back ten steps to our starting point. Feel free to try more exciting combinations here. For a list of all the possible commands,
visit the API documentation for the GoBot Tello device driver [here.](https://godoc.org/gobot.io/x/gobot/platforms/dji/tello#Driver)

## Stunt Flying: Do a Barrell Roll

To wrap things up, let's try executing a trick. So it turns out that even though this looks impressive, it's incredibly easy to pull off. This is because the Tello drone
already has a command baked in that can execute the maneuver. We only need to trigger it! Nevertheless, it's a cool capstone to our introduction to scripting the DJI Tello drone with Gobot.

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
      //highlight-start
      drone.FrontFlip()
      //highlight-end
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

The only new thing here is calling `drone.FrontFlip()`, and just like that, our little drone is doing acrobatics! I hope this quick intro sparked your imagination, and you are excited
to come up with some new and unique projects to do with this great tool kit. If you don't have the Tello drone, don't worry because
everything we learned here is easily transferrable to the many other devices GoBot can control. So why not have a look at
the GoBot documentation and find the project that's right for you. https://gobot.io/
