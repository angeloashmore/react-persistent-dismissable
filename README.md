# react-persistent-dismissable

React component to persistently dismiss (or undismiss) anything. It remembers by
setting a value using `IndexedDB` on the user's browser for a given key.

## Status

[![npm version](https://img.shields.io/npm/v/react-persistent-dismissable?style=flat-square)](https://www.npmjs.com/package/react-persistent-dismissable)
[![Build Status](https://img.shields.io/github/workflow/status/angeloashmore/react-persistent-dismissable/CI?style=flat-square)](https://github.com/angeloashmore/react-persistent-dismissable/actions?query=workflow%3ACI)

## Installation

```sh
npm install --save react-persistent-dismissable
```

## Example

The following example will render a notice with a close button. When the close
button is clicked, the `dismissed` variable becomes `true` which will add the
`notice--dismissed` class. The class would likely hide the notice.

After clicking the close button, `usePersistentDismissable` will remember the
notice was closed even between browser sessions.

```javascript
import * as React from 'react'
import { usePersistentDismissable } from 'react-persistent-dismissable'
import cn from 'classnames'

const MyNotice = () => {
  const [dismissed, dismiss] = usePersistentDismissable('my-notice')

  return (
    <div className={cn('notice', dismissed && 'notice--dismissed')}>
      <p>Hey, read me! I am a notice.</p>
      <button onClick={dismiss}>Close me</button>
    </div>
  )
}
```

## API

```typescript
usePersistentDismissable(key: string, initial?: boolean) => [boolean, dismiss: () => void, undismiss: () => void]
```

The `usePersistentDismissable` hook accepts a unique key and an optional initial
fallback value. The key should be unique within your whole app.

The initial value is used while the hook reads the user's IndexedDB data. Once
the database returns the persisted data, `dismissed` will update.

Calling `dismiss` will change `dimissed` to `true`.

Calling `undismiss` will change `dimissed` to `false`.
