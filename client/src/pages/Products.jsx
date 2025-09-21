import { React } from 'react';


function Products() {
    const [products, setProducts] = useState(null);

    return ( 
        <div>
            <h1>Products Page</h1>
            <p>This is where the products will be listed.</p>
        </div>
    );
}

export default Products;