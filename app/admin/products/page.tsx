"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Container, Typography, Box, Paper, Stack,
    IconButton, CircularProgress, Dialog,
    DialogTitle, DialogContent, DialogActions,
    TextField, Button as MuiButton, Grid
} from "@mui/material";
import { Product } from "@/types/product";
import Image from "next/image";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@/components/Button";

// Cache for products data
const productsCache = new Map<string, Product[]>();

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(productsCache.get('all') || []);
    const [loading, setLoading] = useState(!products.length);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Memoize product fetching
    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                },
                next: { revalidate: 60 } // Cache for 60 seconds
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const data = await response.json();
            const fetchedProducts = data.record?.products || [];
            productsCache.set('all', fetchedProducts);
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!products.length) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    const handleEdit = useCallback((product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    }, []);

    const handleDelete = useCallback((product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    }, []);

    const handleCloseModals = useCallback(() => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
    }, []);

    const handleSave = useCallback(async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                },
                body: JSON.stringify({
                    products: products.map(p => 
                        p.id === selectedProduct.id ? selectedProduct : p
                    )
                })
            });

            if (!response.ok) throw new Error('Failed to update product');

            const updatedProducts = products.map(p => 
                p.id === selectedProduct.id ? selectedProduct : p
            );
            productsCache.set('all', updatedProducts);
            setProducts(updatedProducts);
            handleCloseModals();
        } catch (error) {
            console.error('Error updating product:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    }, [products, selectedProduct, handleCloseModals]);

    const handleDeleteConfirm = useCallback(async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                },
                body: JSON.stringify({
                    products: products.filter(p => p.id !== selectedProduct.id)
                })
            });

            if (!response.ok) throw new Error('Failed to delete product');

            const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
            productsCache.set('all', updatedProducts);
            setProducts(updatedProducts);
            handleCloseModals();
        } catch (error) {
            console.error('Error deleting product:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    }, [products, selectedProduct, handleCloseModals]);

    // Memoize products grid
    const productsGrid = useMemo(() => (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: 200,
                                borderRadius: 1,
                                overflow: 'hidden',
                                mb: 2
                            }}
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                priority
                                quality={90}
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 1,
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)'
                            }}
                        >
                            {product.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 2,
                                color: 'rgba(255, 255, 255, 0.7)'
                            }}
                        >
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                            <IconButton
                                onClick={() => handleEdit(product)}
                                sx={{
                                    color: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
                                    }
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => handleDelete(product)}
                                sx={{
                                    color: 'error.main',
                                    '&:hover': {
                                        bgcolor: 'error.dark'
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    ), [products, handleEdit, handleDelete]);

    // Loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Container sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="error">{error}</Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push('/admin')}
                    sx={{ mt: 2 }}
                >
                    Back to Admin
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">
                    Products
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setSelectedProduct({
                            id: Date.now(),
                            title: '',
                            price: 0,
                            description: '',
                            category: '',
                            image: '',
                            rating: { rate: 0, count: 0 }
                        });
                        setIsEditModalOpen(true);
                    }}
                >
                    Add Product
                </Button>
            </Box>

            {productsGrid}

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseModals} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedProduct?.id ? 'Edit Product' : 'Add Product'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Title"
                            value={selectedProduct?.title || ''}
                            onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, title: e.target.value } : null)}
                            fullWidth
                        />
                        <TextField
                            label="Price"
                            type="number"
                            value={selectedProduct?.price || 0}
                            onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={selectedProduct?.description || ''}
                            onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                            fullWidth
                        />
                        <TextField
                            label="Category"
                            value={selectedProduct?.category || ''}
                            onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, category: e.target.value } : null)}
                            fullWidth
                        />
                        <TextField
                            label="Image URL"
                            value={selectedProduct?.image || ''}
                            onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, image: e.target.value } : null)}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={handleCloseModals}>
                        Cancel
                    </MuiButton>
                    <MuiButton onClick={handleSave} variant="contained">
                        Save
                    </MuiButton>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteModalOpen} onClose={handleCloseModals} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete "{selectedProduct?.title}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={handleCloseModals}>
                        Cancel
                    </MuiButton>
                    <MuiButton onClick={handleDeleteConfirm} variant="contained" color="error">
                        Delete
                    </MuiButton>
                </DialogActions>
            </Dialog>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => router.push('/admin')}
                >
                    Back to Admin
                </Button>
            </Box>
        </Container>
    );
} 