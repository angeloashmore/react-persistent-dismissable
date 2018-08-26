# react-persistent-dismissable

React component to persistently dismiss children. It remembers by setting a
value in `localStorage` on the user's browser for a given key.

This component uses the [Render Props][render-props] pattern and does not
handle any rendering for you. Instead, it provides the data and functions
needed to manage your UI.

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
notice was closed by setting a `localStorage` value to `true` using `name` as
the key.

```js
import React from 'react'
import cn from 'classnames'
import PersistentDismissable from 'react-persistent-dismissable'

const MyNotice = () => (
  <PersistentDismissable name="myNotice">
    {({ dismiss, dimissed }) => (
      <div className={cn('notice', dismissed && 'notice--dismissed')}>
        <p>Hey, read me! I am a notice.</p>
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

| Name       | Type     | Description                                                                                                  |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| **`name`** | `String` | **Required**. Unique name of the children to be dismissed. This is what identifies the `localStorage` value. |

The `children` prop will receive the following variables:

| Name            | Type       | Description                                     |
| --------------- | ---------- | ----------------------------------------------- |
| **`dismissed`** | `Boolean`  | Boolean determining if the child was dismissed. |
| **`dismiss`**   | `Function` | Function to dismiss the child.                  |
| **`undismiss`** | `Function` | Function to undo the child dismissal.           |

[render-props]: https://reactjs.org/docs/render-props.html
