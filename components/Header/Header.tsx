'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  IconButton, 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Badge,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@/store/cartStore';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'SHOP', href: '/shop' },
  { name: 'CATEGORIES', href: '/categories' },
  { name: 'ADMIN', href: '/admin' },
];

export default function Header() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Get cart information from the cart store
  const cartItems = useCartStore(state => state.items);
  const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1500px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Toolbar disableGutters sx={{ py: 1, px: 0 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 4,
              ml: { xs: 0, md: 2 },
              fontWeight: 700,
              color: 'text.primary',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            AUTO PARTS
          </Typography>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{
                    mx: 1,
                    color: pathname === item.href ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                    position: 'relative',
                    '&::after': pathname === item.href ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -1,
                      left: '25%',
                      width: '50%',
                      height: '2px',
                      bgcolor: '#aaaaaa',
                    } : {},
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Cart Button */}
          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <IconButton 
              color="inherit" 
              aria-label="cart"
              component={Link}
              href="/cart"
              sx={{ color: 'text.primary' }}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 250,
            bgcolor: 'background.paper',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Menu
          </Typography>
          <List>
            {navigation.map((item) => (
              <ListItem 
                key={item.name} 
                component={Link} 
                href={item.href}
                onClick={toggleDrawer}
                sx={{
                  bgcolor: pathname === item.href ? 'action.selected' : 'transparent',
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{
                    color: pathname === item.href ? 'primary.main' : 'text.primary',
                    fontWeight: pathname === item.href ? 600 : 400,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
} 