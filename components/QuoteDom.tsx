'use dom'

// A trivial DOM component. It just renders a string prop.
// The bug is NOT here — it's in how @expo/dom-webview injects this prop
// across the bridge on iOS when the value contains a double quote.
export default function QuoteDom({ label }: { label: string }) {
  return <p style={{ fontFamily: 'system-ui', fontSize: 20, padding: 24 }}>{label}</p>
}
