"use client";
import React, { useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineMenu,
} from "react-icons/hi";
import { MdWindow, MdSettings, MdOutlineCalendarToday } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { RiChat3Line, RiNotificationLine } from "react-icons/ri";
import { IoBagAddOutline } from "react-icons/io5";

import Logo from "../../assets/images/logo.png";
import UserProfileIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const SiteLayout = ({ collapsed, setCollapsed, children }: Props) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const { title, subtitle } = useSelector((state: RootState) => state.header.value);

  // 🔥 Offcanvas state
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const navItems = [
    { label: "Doctors", href: "/doctors", icon: <MdWindow size={22} /> },
    { label: "Patients", href: "/patients", icon: <BsPeople size={22} /> },
    {
      label: "Appointments",
      href: "/appointments",
      icon: <MdOutlineCalendarToday size={22} />,
    },
    {
      label: "Treatment Plan",
      href: "/treatment-plan",
      icon: <IoBagAddOutline size={22} />,
    },
    { label: "Settings", href: "/settings", icon: <MdSettings size={22} /> },
  ];

  const handleScrollDown = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="layout">
      {/* ====== DESKTOP SIDEBAR ====== */}
      <aside
        className={`sidebar desktop-sidebar ${
          collapsed ? "sidebar--collapsed" : "sidebar--expanded"
        }`}
      >
        <button
          type="button"
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <HiOutlineChevronDoubleRight /> : <HiOutlineChevronDoubleLeft />}
        </button>

        <div className="sidebar__top">
          <Link href="/" className="sidebar__logo-link">
            <img src={Logo.src} alt="Logo" className="sidebar__logo" />
          </Link>
          <hr className="sidebar__divider" />
          <Nav className="sidebar__nav" ref={navRef}>
            {navItems.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href + i}
                  href={item.href}
                  className={`sidebar__nav-item ${isActive ? "is-active" : ""}`}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__text">{item.label}</span>
                </Link>
              );
            })}
          </Nav>
        </div>

        <div className="sidebar__bottom">
          <div role="button" className="sidebar__collapse" onClick={handleScrollDown}>
            <FaChevronDown size={20} />
          </div>
          <div className="sidebar__user">
            <img
              src={UserProfileIcon.src}
              alt="User"
              className="sidebar__user-avatar"
            />
            <span className="sidebar__text">John Doe</span>
          </div>
        </div>
      </aside>

      {/* ====== OFFCANVAS SIDEBAR (MOBILE/TABLET) ====== */}
      <div className={`offcanvas-backdrop ${showOffcanvas ? "show" : ""}`} onClick={() => setShowOffcanvas(false)}></div>
      <aside className={`sidebar offcanvas-sidebar ${showOffcanvas ? "open" : ""}`}>
        <div className="offcanvas-header">
          <button
          type="button"
          className="sidebar__toggle"
          onClick={() => setShowOffcanvas(false)}
        >
           <HiOutlineChevronDoubleLeft size={18} />
        </button>
        </div>
        <div className="sidebar__top">
          <Link href="/" className="sidebar__logo-link" onClick={() => setShowOffcanvas(false)}>
            <img src={Logo.src} alt="Logo" className="sidebar__logo" />
          </Link>
          <hr className="sidebar__divider" />
          <Nav className="sidebar__nav">
            {navItems.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href + i}
                  href={item.href}
                  className={`sidebar__nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => setShowOffcanvas(false)}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__text">{item.label}</span>
                </Link>
              );
            })}
            
          </Nav>
        </div>

        <div className="sidebar__bottom">
          <div role="button" className="sidebar__collapse" onClick={handleScrollDown}>
            <FaChevronDown size={20} />
          </div>
          <div className="sidebar__user">
            <img
              src={UserProfileIcon.src}
              alt="User"
              className="sidebar__user-avatar"
            />
            <span className="sidebar__text">John Doe</span>
          </div>
        </div>
      </aside>

      <main className="layout__content">
        <header className="layout__header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {/* ☰ menu button visible only on mobile/tablet */}
            <button
              className="mobile-menu-btn"
              onClick={() => setShowOffcanvas(true)}
            >
              <HiOutlineChevronDoubleRight size={18} />
            </button>
            <div>
              <h2 className="layout__title">{title}</h2>
              <h4 className="layout__subtitle mt-1">{subtitle}</h4>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="header-icon-container">
              <RiChat3Line size={18} />
            </span>
            <span className="header-icon-container">
              <RiNotificationLine size={18} />
            </span>
          </div>
        </header>
        <div className="layout__body">{children}</div>
      </main>
    </div>
  );
};

export default SiteLayout;
