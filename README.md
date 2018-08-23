# react-persistent-dismissable

React component to persistently dismiss children. It does so by setting a
cookie on the user's browser for a given key to remember if a particular key
was dismissed previously.

`PersistentDismissable` uses the [Render Props][render-props] pattern and does
not handle any rendering for you.

## Status

[![npm version](https://badge.fury.io/js/react-persistent-dismissable.svg)](http://badge.fury.io/js/react-persistent-dismissable)

## Installation

```sh
npm install --save react-persistent-dismissable
```

## Example

The following example will render a notice with a close button. When the close
button is clicked, the `dismissed` variable becomes `true` which will add the
`notice--dismissed` class. The class would likely hide the notice.

After clicking the close button, `PersistentDismissable` will remember the
notice was closed by setting a cookie.

```js
import React from 'react'
import PersistentDismissable from 'react-persistent-dismissable'

const MyNotice = () => (
  <PersistentDismissable generateIdFrom="myNoticeId">
    {({ dismiss, dimissed }) => (
      <div className={cn('notice', dismissed && 'notice--dismissed')}>
        <p>Hey, read me! I'm a notice.</p>
        <button onClick={dismiss}>Close me</button>
      </div>
    )}
  </PersistentDismissable>
)
```

Note that `PersistentDismissable` uses the [Render Props][render-props] pattern
and does not handle any rendering for you. It only provides a `dismiss`
function and a `dismissed` boolean variable. This allows you to handle all
presentation aspects.

## Props

| Name          | Type                | Description                                                                                                                                                 |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**    | `String` (required) | Unique name of the thing to be dismissed. This is what identifies the cookie.                                                                               |
| **`path`**    | `String`            | URL path to scope the cookie. This usually can be left to the default. Default: `/`.                                                                        |
| **`expires`** | `Number` or `Date`  | If given a `Number`, it is the number of days the cookie should persist. If given a `Date`, it is the date the cookie should expire. Default: never expire. |

The `children` prop will receive the following variables:

| Name            | Type       | Description                                     |
| --------------- | ---------- | ----------------------------------------------- |
| **`dismissed`** | `Boolean`  | Boolean determining if the child was dismissed. |
| **`dismiss`**   | `Function` | Function to dismiss the child.                  |
| **`undismiss`** | `Function` | Function to undo the dismissal of the child.    |

[render-props]: https://reactjs.org/docs/render-props.html
