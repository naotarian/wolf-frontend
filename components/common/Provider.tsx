"use client"

import React from "react"

import { ThemeProvider } from "@mui/material/styles"

import theme from "@/components/common/theme"


export default function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
