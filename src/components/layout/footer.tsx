export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container max-w-screen-2xl text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} APSAD Heritage Hub. All rights reserved.</p>
        <p className="mt-1">Dedicated to preserving our shared history.</p>
      </div>
    </footer>
  );
}
