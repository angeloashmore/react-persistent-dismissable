import * as React from 'react'
import * as idb from 'idb-keyval'

export const usePersistentDismissable = (
  key: string,
  initial?: boolean,
): readonly [boolean | undefined, () => void, () => void] => {
  const nsKey = `___usePersistentDismissable___${key}`

  const [dismissed, setDismissed] = React.useState(initial)
  const dismiss = () => setDismissed(true)
  const undismiss = () => setDismissed(false)

  React.useLayoutEffect(() => {
    let didCancel = false

    const asyncFn = async () => {
      const res = await idb.get(nsKey)
      if (!didCancel) setDismissed(Boolean(res))
    }
    asyncFn()

    return () => {
      didCancel = true
    }
  }, [nsKey])

  React.useEffect(() => {
    idb.set(nsKey, Boolean(dismissed))
  }, [dismissed, nsKey])

  return React.useMemo(() => [dismissed, dismiss, undismiss] as const, [
    dismissed,
  ])
}
