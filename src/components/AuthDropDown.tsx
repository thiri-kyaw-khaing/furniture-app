import { Link, Form } from "react-router-dom";
import type { User } from "src/types/index.ts";
import { Button } from "@/components/ui/button.tsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExitIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
interface AuthDropDownProps {
  user: User;
}

export default function AuthDropDown({ user }: AuthDropDownProps) {
  if (!user) {
    return (
      <Button asChild size="sm">
        <Link to="/signin">Sign In</Link>
      </Button>
    );
  }
  const initialName = `${user?.firstName?.[0]}${user?.lastName?.[0]}`;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="size-8 rounded-full">
            <Avatar>
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{initialName}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-muted-foreground text-sm leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="#">
                <PersonIcon className="size-4 mr-2" />
                Profile
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="#">
                <GearIcon className="size-4 mr-2" />
                Setting
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            {/* <Link to='/login'>
                            <ExitIcon className="size-4 mr-2"/>
                            Logout
                            <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                        </Link> */}
            <Form method="POST" action="/logout">
              <button type="submit" className="w-full">
                Logout
              </button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
