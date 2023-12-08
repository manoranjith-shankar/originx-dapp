'use client'

import React from "react";
import Image from "next/image";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar} from "@nextui-org/react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem} from "@nextui-org/react";
import {AcmeLogo} from "./Logo";
import v2Logo from "@/public/originx-v2-main-logo-transparent.png"

export default function NavigationBar() {
  return (
    <div className="page-header--transparent fixed top-0 z-10 w-full backdrop-blur transition-colors">
    <Navbar className="bg-transparent">
      <NavbarBrand>
        <Image 
          src={v2Logo}
          alt = ''
          width={120}
          height={120}
        />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Elemental Word1
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Elemental Word2
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </div>
  );
}