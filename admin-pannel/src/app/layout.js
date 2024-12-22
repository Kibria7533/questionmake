"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import store from "../redux/store";
import { login, logout } from "../redux/store";

// Root Layout with Sidebar and Header
export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body >
          {children}
      </body>
    </html>
     </Provider>
  );
  return <Provider store={store}>{children}</Provider>;
}

