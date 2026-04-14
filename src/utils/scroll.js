export function scrollToSection(href, navigate, location) {
  const id = href.replace('#', '')
  if (location.pathname === '/') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigate('/')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }
}
