import './globals.css'

export const metadata = {
  title: 'Questions',
  description: 'Hello World',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='m-5'>{children}</body>
    </html>
  )
}
