export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
