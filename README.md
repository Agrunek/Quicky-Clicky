# Quicky-Clicky

This is the source code for the reaction-time test app! :rocket:

## Genesis

The original app is [ReactionTimeExperiment](https://www.yorku.ca/mack/ExperimentSoftware/) created by **Scott MacKenzie** and **Steven Castellucci**.
All credit goes to the original authors.
However, using the app at my university was challenging in many ways.
Moreover, it is a native `Java` application, which requires additional work to run.
Fortunately, there is the following note:

> Feel free to use or modify the apps in whatever way suits your purpose.

_I took that to heart_ and rewrote the entire app from scratch in `React`, hosting it on GitHub Pages. :sweat_smile:

## Experiments

The core concept of the app is to test user reaction time in different scenarios.
Each experiment is described below:

| Name                | Description                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Simple_Reaction`   | The most common way of testing reaction time. The user needs to wait for the color of a box displayed on the screen to change.                                                                             |
| `Physical_Matching` | First, a random 5-letter word appears on the screen, followed by another one. The user needs to decide whether both words are the same - as fast as possible, of course.                                   |
| `Name_Matching`     | Mostly the same as the _previous one_. However, the style of each word is fully randomized.                                                                                                                |
| `Class_Matching`    | Here, a random letter or digit is shown. When the second one appears, the user has to decide whether both symbols belong to the same set. As in _Name Matching_, the style is randomized.                  |
| `Visual_Search`     | A random letter and an empty grid of a given size are shown on the screen. After some time, the grid is filled with more random letters. The user must decide whether the first letter exists in the grid. |

## Attempt Management

This feature will be implemented in 1.1 version...
