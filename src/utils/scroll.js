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

export function handleNavClick(href, navigate, location) {
  if (href.startsWith('/')) {
    navigate(href)
  } else {
    scrollToSection(href, navigate, location)
  }
}
