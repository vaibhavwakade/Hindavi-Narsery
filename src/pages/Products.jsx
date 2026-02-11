import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Plants` : 'Shop All Products'}
      </h1>
      <ProductList 
        categoryParam={category || ''}
        searchQuery={type || ''}
      />
    </div>
  );
}

export default Products;
