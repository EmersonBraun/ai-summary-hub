// Renders an inline JSON-LD script. Content must be a fully controlled,
// server-side data structure (never user input) — we hand-build all
// payloads in route files, then serialize here.
//
// Uses a React text child rather than dangerouslySetInnerHTML, with a
// guard against premature </script> termination.

export function JsonLd({ data }: { data: object }) {
  const safe = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {safe}
    </script>
  );
}
