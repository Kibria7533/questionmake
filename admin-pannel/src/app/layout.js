"use client";

import { Provider } from "react-redux";
import store from "../redux/store";

// Root Layout with Sidebar and Header
export default function RootLayout({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
