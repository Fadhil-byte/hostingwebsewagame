// ==========================================================================
// SewaGame - Interactive Client-Side JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        const handleScroll = function() {
            if (window.scrollY > 30) {
                navbar.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
                navbar.style.paddingTop = '0.65rem';
                navbar.style.paddingBottom = '0.65rem';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.paddingTop = '0.85rem';
                navbar.style.paddingBottom = '0.85rem';
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 2. Product Category Filter & Search (products.html)
    const categoryButtons = document.querySelectorAll('[data-category-filter]');
    const productItems = document.querySelectorAll('[data-product-item]');
    const searchInput = document.getElementById('productSearchInput');

    function filterProducts() {
        const activeBtn = document.querySelector('[data-category-filter].btn-primary');
        const selectedCategory = activeBtn ? activeBtn.getAttribute('data-category-filter') : 'all';
        const searchKeyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category') || '';
            const itemName = (item.querySelector('.product-name') ? item.querySelector('.product-name').textContent : '').toLowerCase();
            const itemDesc = (item.querySelector('.product-desc') ? item.querySelector('.product-desc').textContent : '').toLowerCase();

            const matchesCategory = (selectedCategory === 'all' || itemCategory === selectedCategory);
            const matchesSearch = (!searchKeyword || itemName.includes(searchKeyword) || itemDesc.includes(searchKeyword));

            if (matchesCategory && matchesSearch) {
                item.style.display = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        const emptyState = document.getElementById('productsEmptyState');
        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                categoryButtons.forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-light-custom');
                });
                this.classList.remove('btn-light-custom');
                this.classList.add('btn-primary');
                filterProducts();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // 3. Cart Removal Simulation & Total Recalculation (cart.html)
    const deleteCartButtons = document.querySelectorAll('.btn-delete-cart-item');
    deleteCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Hapus produk ini dari keranjang belanja?')) {
                const row = this.closest('tr');
                if (row) {
                    row.remove();
                    updateCartTotals();
                }
            }
        });
    });

    function updateCartTotals() {
        const rows = document.querySelectorAll('tbody tr[data-price]');
        let total = 0;
        rows.forEach(row => {
            const price = parseInt(row.getAttribute('data-price') || 0, 10);
            total += price;
        });

        const totalDisplays = document.querySelectorAll('.cart-total-price');
        totalDisplays.forEach(el => {
            el.textContent = 'Rp ' + total.toLocaleString('id-ID');
        });

        const countDisplays = document.querySelectorAll('.cart-count-display');
        countDisplays.forEach(el => {
            el.textContent = rows.length + ' Produk';
        });

        const badgeCounter = document.querySelector('.cart-pill-badge');
        if (badgeCounter) {
            badgeCounter.textContent = rows.length;
            if (rows.length === 0) {
                badgeCounter.style.display = 'none';
            }
        }

        if (rows.length === 0) {
            const cartContent = document.getElementById('cartContentSection');
            const cartEmpty = document.getElementById('cartEmptySection');
            if (cartContent) cartContent.style.display = 'none';
            if (cartEmpty) cartEmpty.style.display = 'block';
        }
    }

    // 4. Smooth Anchor Scroll
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navOffset = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;

                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
