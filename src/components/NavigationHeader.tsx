import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Home, User, Menu, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NavigationHeader = () => {
  const { user, signOut } = useAuth();

  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-primary">Homestay Finder</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Home
            </Link>
            <Link to="/homestays" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
              About
            </Link>
            <Link to="/attractions" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
              Features
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
              Contact
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-primary/30">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <p className="font-medium text-sm">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="cursor-pointer">My Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/become-host" className="cursor-pointer">Become a Host</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-9 text-sm font-medium">
                  Sign Up
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
