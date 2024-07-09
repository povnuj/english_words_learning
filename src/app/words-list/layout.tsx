import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Words List",
  description: "Learn English words with Domana cards. Exist testing mode and 3 ways to learning",
  
  openGraph: {
    title: 'Words List',
    description: 'Learn English words with Domana cards. Exist testing mode and 3 ways to learning',
  }
};

export default function ContactsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
