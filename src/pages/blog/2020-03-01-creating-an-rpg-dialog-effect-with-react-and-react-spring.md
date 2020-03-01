---
templateKey: blog-post
title: Creating an RPG Dialog Component with React and React Spring
date: 2020-03-01T21:02:20.866Z
featuredpost: false
published: true
author: Cameron Tatz
authorimage: /img/contributors/ctatz.png
featuredimage: /img/blog-images/browsergames.jpg
description: >-
  React is becoming useful for more than just web apps and e-commerce sites. You can use it to build game UIs too. Follow along as we build an RPG dialog box together.
tags:
  - programming
  - javascript
  - intermediate
  - gamedev
  - react
  - react-spring
  - tutorials
---

> Note: This article assumes you already are comfortable using JavaScript and React. Feel free to [reach out](https://twitter.com/CamTatz) if you have any feedback on this tutorial or want some help.
>
> ## Topics Covered
>
> 1.  Pixel Art Style Look using the CSS border image property
> 2.  Using React Spring to create an RPG style dialog text effect.

This is the first article in a series on developing browser based games using React. We will learn how to achieve game-like UI and visuals by building a series of game features one at a time and tying them together to create a real game. We'll start simply by creating a dialog box UI to use in our game. This will help us get familiar with using `react` and the `react-spring` library for animation. Enjoy!

## Building Our First Game Feature

So you want to build a browser based RPG with amazing visuals, mechanics and story! But there's an issue, your awesome characters are trying to talk but don't have any way to communicate! Well what better way for your characters to express your witty dialogue than through a classic RPG Dialog box. Below is a finished version of what we are going to build together. You can refer back to it as you go if you get lost.

<iframe
src="https://codesandbox.io/embed/cams-dialog-box-hpl38?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="Cam&#039;s Dialog Box"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"

> </iframe>

### Follow along

> Here's an empty Code Sandbox with react and all the dependencies for this tutorial ready to use if you would like to follow along from scratch. You can refer to the completed demo Code Sandbox above if you want as well.
> [React Spring Starter Kit](https://codesandbox.io/s/react-spring-starter-9u6xv)

# Designing our Dialog Box Component

Our dialog box will have three main parts: The name of the speaker, the message itself, and a footer where we can place a button the player can use to continue to the next message. We could also show a portrait of the character speaking but we'll leave that for later.
​

```javascript
// DialogBox.js

import React from "react";

// Just a placeholder for now.
const Message = () => <div />;

// Our DialogBox Component.
const DialogBox = () => {
  return (
    <div className="DialogWindow">
      <div className="dialogTitle">Cameron</div>
      <Message />
      <div onClick={handleClick} className="dialogFooter">
        Next
      </div>
    </div>
  );
};

export default DialogBox;
```

This is the basic structure of our dialog box, notice that we are just using a placeholder for the actual message component. We will get to that in the next step. For now we can style our dialog by adding some css.
​

```css
/*style.css*/
.DialogBox {
  background-color: #e2b27e;
  border: solid;
  border-image: url("/borderbox_simple.png") 25 / 10px 10px 10px 10px stretch;
  padding: 15px;
}

.dialogTitle {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.dialogFooter {
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 15px;
  text-align: end;
}
```

You can use the CSS property [`border-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image) to acheive the classic pixel art border effect. The `border-image` property allows you to define parts of an image to use as the border of an html element.
​

## Adding State and Creating the Messages

First in our `App.js` file let's create some messages to display and pass them in to the `DialogBox` component as a prop. We'll let our DialogBox control which message to display.

```javascript
// App.js
import React from "react";

import DialogBox from "./DialogBox";
import "./styles.css";

// Just hard coding these for now to demonstrate our DialogBox component.
const messages = [
  "This is a very cool rpg dialog message.",
  "If you would like to see more awesome stuff, check out the other writeups at codeworkshop.dev!",
  "Remember to wash your hands!"
];

export default function App() {
  return (
    <div className="App">
      <DialogBox messages={messages} />
    </div>
  );
}
```

Then in our dialog box add some state to keep track of which message we should be displaying.

```javascript
// DialogBox.js
import React, { useState } from "react";

import "./styles.css";

const Message = () => <div />;
// start-highlight

// end-highlight
const DialogBox = () => {
  // start-highlight
  const [currentMessage, setCurrentMessage] = useState(0);
  const handleClick = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    } else {
      setCurrentMessage(0);
    }
  };
  // end-highlight
  return (
    <div className="DialogBox">
      // Notice the speaker's name is hard coded. Can you make changes to
      support different speakers for different messages?
      <div className="dialogTitle">Cameron</div>
      <Message message={messages[currentMessage]} key={currentMessage} />
      <div onClick={handleClick} className="dialogFooter">
        Next
      </div>
    </div>
  );
};
export default DialogBox;
```

Now we can keep track of which message to display, and provide a function for changing the displayed message. But we still haven't implemented the Message component, so even though we are passing it props, it's not going to do anything. Let's do that next.

## Animated Typewriter Effect

Alright, now we come to the meat and potatoes of our DialogBox. Adding the animated type-writer effect to the `Message` component using `react-spring`. React Spring is such a powerful animation library specifically because it let's us animate just about anything you can assign a value to.
​

```javascript
// Message.js
import  React,  {  useMemo  }  from  "react";
import  {  animated,  useTransition  }  from  "react-spring";
​
const  Message  =  ({ message })  =>  {
	const  items  =  useMemo(
		()  =>
			message.split("").map((letter,  index)  =>  ({
				item:  letter,
				key:  `${letter}${index}`
			})),
		[message]
	);
​
	const  transitions  =  useTransition(items,  item  =>  item.key,  {
		trail:  35,
		from:  { display:  "none"  },
		enter:  { display:  ""  }
	});
​
	return  (
		<div  className="DialogMessage">
			{transitions.map(({ item, props, key }) => {
				return (
					<animated.span  key={key} style={props}>
						{item.item}
					</animated.span>
				);
			})}
		</div>
	);
};
export  default  Message;
```

​
Here we have expanded the `<Message />` component to accept a message as a prop, split it into an array of characters and used `react-spring`'s `useTransition` to animate each character. For more details on how to use `useTransition` visit [React-Springs documentation](https://www.react-spring.io/docs/hooks/use-transition).
​

> Note! Keep in mind that you'll need to properly key our `<Message />` component if we're sending it new messages or you'll see some weird effects since react will lose track of the internal character keys. You can see this being achieved in the DialogBox component in the demo. Take out the key attribute if you're curious.
> ​

# Final Words and Next Steps

​
To make this really useful there are a few other things that we might want to do, like clear the dialog when we get to the last message, or provide a way to control the speed of the text animation. If you take the initiative to add any of these features I'd love to see them. The best place to reach me is on twitter [@camtatz](https://twitter.com/CamTatz). Next time we will take this simple message UI component and combine it with `react-three-fiber` to get closer to an actual game.
