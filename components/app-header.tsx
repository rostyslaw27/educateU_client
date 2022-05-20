import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
  Button,
  Container,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { authAPI } from '../api/auth/auth.api'

const AppHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { data: session } = useSession()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = async () => {
    await authAPI.logout()
    signOut({
      callbackUrl: `${window.location.origin}`,
    })
    handleCloseUserMenu()
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/">
              <a>EducateU</a>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href="/courses/create">
                    <a>Create Course</a>
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href="/courses">
                    <a>Courses</a>
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            EducateU
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link href="/courses/create">
                <a>Create Course</a>
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link href="/courses">
                <a>Courses</a>
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
              {session?.user?.email}
            </Button>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                sx={{ pt: 1 }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!session ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href="/auth">
                      <a>Sign In</a>
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href="/courses/created">
                        <a>Created courses</a>
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href="/courses/purchased">
                        <a>Purchased courses</a>
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppHeader
