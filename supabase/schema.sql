CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_best_seller BOOLEAN DEFAULT FALSE
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_type TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    table_number INT,
    delivery_address TEXT,
    status TEXT DEFAULT 'pending',
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO menu_items (name, description, price, category, image_url, is_best_seller) VALUES
('Covian Signature Biryani', 'Aromatic basmati rice cooked with secret spices.', 350.00, 'Mains', 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=500', true),
('Bangalore Masala Dosa', 'Crispy crepe served with chutneys and sambar.', 120.00, 'Breakfast', 'https://images.unsplash.com/photo-1668231312523-01825dc98a28?w=500', true),
('Spicy Tandoori Wings', 'Smoky, charred chicken wings marinated in yogurt.', 280.00, 'Starters', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', false),
('Paneer Butter Masala', 'Soft paneer cubes in a rich tomato gravy.', 310.00, 'Mains', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500', true);
