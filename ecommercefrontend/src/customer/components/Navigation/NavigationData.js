export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: "top" },
            { name: 'Dresses', id: "dress" },
            { name: 'Jackets', id: 'jacket' }
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Wallets', id: 'wallet' },
            { name: 'Bags', id: 'bag' },
            { name: 'Sunglasses', id: 'sunglasse' },
            { name: 'Belts', id: 'belt' }
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Chanel', id: '#' },
            { name: 'Fendi', id: '#' },
            { name: 'Prada', id: '#' },
            { name: 'Dior', id: '#' },
            { name: 'Gucci', id: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Basic Tees',
          id: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirt', id: 'shirt' },
            { name: 'Men Jeans', id: 'jeans' },
            { name: 'Jackets', id: 'jacket' }
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Wallets', id: 'wallet' },
            { name: 'Bags', id: 'bag' },
            { name: 'Sunglasses', id: 'sunglasses' },
            { name: 'Belts', id: 'belt' }
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Chanel', id: '#' },
            { name: 'Fendi', id: '#' },
            { name: 'Prada', id: '#' },
            { name: 'Dior', id: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
}