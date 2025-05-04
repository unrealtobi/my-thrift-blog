import {
  Roboto,
  Pacifico,
  Raleway,
  Ubuntu,
  Lato,
  Poppins,
  Open_Sans,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-ubuntu",
});
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-opensans",
});

export const metadata = {
  title: "My Thrift Blog",
  description:
    "Tap into our world—insider tips, smart thrift shopping guides, exclusive drops, product updates, and more.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "My Thrift Blog",
    description:
      "Tap into our world—insider tips, smart thrift shopping guides, exclusive drops, product updates, and more.",
    url: "https://blog.shopmythrift.store/",
    images: [
      {
        url: "https://blog.shopmythrift.store/favicon.ico",
        width: 1200,
        height: 630,
        alt: "My Thrift Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Thrift Blog",
    description:
      "Tap into our world—insider tips, smart thrift shopping guides, exclusive drops, product updates, and more.",
    images: ["https://blog.shopmythrift.store/twitter.png"],
  },
};

export default function RootLayout({ children }) {
  const fontVars = [
    roboto.variable,
    pacifico.variable,
    raleway.variable,
    ubuntu.variable,
    lato.variable,
    poppins.variable,
    opensans.variable,
  ].join(" ");
  return (
    <html lang="en" className={fontVars}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
