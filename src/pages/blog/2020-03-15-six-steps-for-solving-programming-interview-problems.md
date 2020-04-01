---
templateKey: blog-post
title: Six Steps for Solving Programming Interview Problems
date: 2020-03-15T01:02:20.866Z
featuredpost: false
published: true
author: Stephen Castle
authorimage: /img/contributors/stephen.jpg
featuredimage: /img/blog-images/interview-problems.jpg
description: >-
  Learn how to systematically approach and solve a programming interview problem and maximize your chance of success.
tags:
  - programming
  - javascript
  - go
  - python
  - beginners
  - career development
  - interview problems
  - tutorials
---

One popular type of technical interview, especially at more prominent companies, is the algorithmic programming challenge. These can be tricky if you haven't been in a computer science class for a while. In fact, unless you practice competitive programming and have really great technique for solving this type of problem, it is not hard to get stuck or run into trouble during this type of interview, even if you have tons of job experience. The danger feels especially poignant when you have to do it on a whiteboard with no text editor or resources to fall back on.

## A Systematic Approach

Even though it can be nerve-racking, the best way to approach this type of interview is to follow a system so at least you give it your best shot. Don't get frustrated even if you think this type of problem is unfair. There is somewhat of a movement to change up the interview process so that passing this type of test is not the only way to qualify for a job. However, at the moment, it is still super likely you will see one of these questions at some point, and the majority of the time, the interviewer is not going to be interested in a philosophical debate on hiring practices.

> Six Steps for Passing Programming Interviews

> 1. Read, repeat, question, and understand
> 2. Write a "pseudo" pseudoCode solution
> 3. Think and talk about test cases as you go
> 4. Implement your solution in a real language with which you are most comfortable.
> 5. Consider the time and space complexity of your solution.
> 6. Refactor for better performance or structure as time allows.

## A Sample Problem

Let's go through a sample interview problem and follow our steps. This is a real interview problem asked by google. It's an easier one, but the same steps apply to pretty much any interview challenge.

> ### The Sum of Pairs Problem
>
> Given a list of numbers and a number k, return true if any two numbers in the array sum to k, and false if there is no combination of numbers that sums to k.

> For example, given [12, 13, 4, 3] and k of 7, return true since 4 + 3 is 7.

## Read, Repeat, Question, and Understand The Problem

Start by repeating the problem as you understand it back to the interviewer. If anything is unclear now is a good time to talk it through and make sure you understand the question. Some harder problems even intentionally have ambiguity to test you on this.

## Write out a "Pseudo" Pseudo Code Solution

Once you have a firm grasp of the challenge, try writing out the steps you might take as comments. It's ok if you can't think of the optimal solution at first, but talk through your thought process as you go with the interviewer and listen to their feedback. Sometimes they will give you hints that push you in the right direction. This can be similar to pseudo code, but feel free to be a little more descriptive about why and what you are doing in each step. This is a great technique to help think through the problem.

```
# Store the numbers that we have seen as a key in a hash map.
# Loop through the values in array.
#   Check if there has already been another number
#   that adds up to k when added to the current number
#     If there is. We can return true.
#     If there is not. Add this number to the hash Map.
```

Writing it out in plain explanatory text will help you think clearly without trying to remember syntax and not over-commit you to anything until you know what you want to implement. It will also help the interviewer understand your thought process.

You can leave your comments in place and write your code around them too. They can serve as additional documentation.

## Think and Talk About Test Cases As You Go

When you have a feasible solution, check yourself by writing down some sample inputs at the bottom of your file. If you are interviewing in a REPL ask if you can run them. Even if you can't run your pseudocode, write some test function calls and step through your pseudo code with the test input out loud with the interviewer. Think about what happens with different possible inputs.

First, we can consider a simple set of tests that we can easily step through in our head with our pseudo code.Then you confidently build out the solution.

```
# Should Return true if pairs sum: [1,2,3,4] k=5

# Should Return false if pairs do not sum: [1,2,3,4] k=42
```

Make sure the assumption holds if the match is in different parts of the array. If you only try one test case, you might have just gotten lucky, and your solution isn't generalizable. A few simple tests should be enough to cover that.

```
# Should Return true if pairs sum: [1,4,7,2] k=5
```

In our case, we should consider a few edge cases too. For example, what happens if there is more than one pair of numbers that match, and the problem statement said numbers, does that mean just integers or floats too? You should talk through any ideas you have about test cases to an interviewer, they will appreciate your careful consideration to the API and robustness of your solution.

```
# Should Work with more than one match: [2,2,4,5, 2] k=4
```

Or how about if there are negative numbers?

```
# Should work with negative numbers. [2,2,-4,5, 2] k=4
```

Is it possible our array could have nonintegers in it? Do you need to handle that in your language of choice?

```
# Should return undefined if invalid array. [2,2,-4,"a", 2] k=4
```

Depending on the environment you are doing the challenge in, you could write out a table of test cases and assertions to execute. Refer to the code examples at the end of this post for a version of this. The ability to run and test your code with an interpreter only sometimes applies, though. If this is a whiteboard interview, you should just write your cases out and go through them out loud.

## Implement your Solution In Your Most Comfortable Language

It's generally a good idea to use whatever language you use most often if you have the option. Your code will look a lot more elegant if you are comfortable with the syntax. Most interviewers understand this and won't judge you for the language you pick even if the role will primarily use a different language. You can always talk about this with your interviewer.

Here is our algorithm from above in python.

```python
def testIfHasPair(arr, k):
  hash_of_values = {} # This could also be a set.
  for value in arr:
    if k - value in hash_of_values:
      return True
    hash_of_values[value] = value
  return False
```

## Consider the Efficiency of Your Solution

Interviewers often ask what the time and space efficiency of your solution is. Time complexity is a function that defines how computation grows as a function of input length, and space complexity is how fast the memory required grows as a function of the input length.

In our first solution, the time complexity is `O(n)` and the space complexity is also `O(n)`. It's also possible the interviewer will discuss with you what the best, average, and worst-case running times are, so it's a good idea to review those concepts too.

## Can you Refactor to Make it Better

So it turns out our first solution is the fastest way to solve this problem. But you should stop at this point and discuss any thoughts you have about other ways you could implement it. You may not think of a better way, but It's still a good idea to have the discussion. If you do think of a faster solution and you have time to implement it, go ahead and write it out. Keep your first one around for comparison.

## Final Advice

Even if you follow this advice, there is no substitute for practicing common interview problems A LOT. We've all heard stories of senior developers with incredible reputations failing interviews at FANG companies, and it can happen to anyone.

One way to approach practice is to study like a competitive programmer and work on doing lots of problems, but also learning to classify them into recognizable categories, and learning all of the techniques that apply to certain classes of problems.

This means do the problems fresh first, but afterward, go out and research the challenge. Learn about the types of solutions that exist for it, and the type of algorithm used.

Learning all of the many algorithms and data structure types is a bit beyond the scope of this post. Still, an excellent example of low hanging fruit is to be able to recognize when a problem is a graph traversal problem and have in your mind a robust set of depth-first and breadth-first traversal techniques. If you do enough practice problems and think about them in this way, you will eventually build up a tool kit for solving the majority of interview challenges quickly.

Another trick I like to use is to go back to problems I've already solved and do them again in a different language. Repetition and thinking in different styles is an excellent way to stay fresh on another language syntax, but it also helps keep each problem locked in your mind longer and increase the chances it will help you when you see something similar.

## Resources

### Practice Problems

Here are a few good sources for practice problems.

https://www.dailycodingproblem.com/
https://www.hackerrank.com/
https://www.codewars.com/

### Solved Problems and Topic Background

GeeksForGeeks has a lot of good material. There might be some better sources out there, but it's a pretty comprehensive source.

https://www.geeksforgeeks.org/

## Appendix

Here are the solutions I came up with in three different languages along with my test cases.

### Python

<iframe height="400px" width="100%" src="https://repl.it/@xxtracerxx/Sum-of-Pairs-in-Array-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Go

<iframe height="400px" width="100%" src="https://repl.it/@xxtracerxx/Sum-of-Pairs-in-Array-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Javascript

<iframe height="400px" width="100%" src="https://repl.it/@xxtracerxx/Sum-of-Pairs-in-Array-JS?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
