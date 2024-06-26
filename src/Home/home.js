import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import Menu from '../components/menu/menu';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalItems } from '../features/cart/cartSlice';

const Home = ({ loading, products, cart, error }) => {
    const { totalItemsLoading, totalItems, errorItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    useEffect(() => {
        if (cart.length > 0) {
            dispatch(getTotalItems({ orderId: cart[0].order_id }));
        }
    }, [cart, dispatch]);

    return (
        <div>
            <header className='home-header'>
                <nav className='home-nav'>
                    <div className='left-nav'>
                        <NavLink to={'/'} className={'logo'}><h1>Voltbike</h1></NavLink>
                        <ul className='links'>
                            {products.map((product) => (
                                <li key={product.product_id}>
                                    <NavLink to={`/product/${product.product_id}`}>
                                        {product.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='right-nav'>
                        <NavLink to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" /></NavLink>
                        <div className="circle">
                            {totalItemsLoading || errorItems ? (
                                <p>...</p>
                            ):(
                                <p>{totalItems}</p>
                            )}
                        </div>
                        <NavLink to={'/account/personal-info'}><FontAwesomeIcon icon={faCircleUser} size='xl' color="#fff" /></NavLink>
                    </div>
                    <div className='menu'>
                        <Menu loading={loading} products={products} cart={cart} totalItems={totalItems} error={error} />
                    </div>
                </nav>
                <div className='header-title'>
                    <h1>Ride into the Future with VoltBike</h1>
                    <p>Your Eco-Friendly Electric Bike Destination!</p>
                    <button className='btn'>Learn more</button>
                </div>
            </header>
                {loading && (
                    <section className='products'>
                        <div className='img-2' style={{backgroundColor: "#F5F5F5"}}></div>
                        <div className='img-2' style={{backgroundColor: "#0B1C26"}}></div>
                        <div className='img-2' style={{backgroundColor: "#F5F5F5"}}></div>
                        <div className='img-2' style={{backgroundColor: "#0B1C26"}}></div>
                    </section>
                )}
                {!loading && error ? (
                    <section className='products'>
                        <div className='img-2' style={{backgroundColor: "#F5F5F5"}}></div>
                        <div className='img-2' style={{backgroundColor: "#0B1C26"}}></div>
                        <div className='img-2' style={{backgroundColor: "#F5F5F5"}}></div>
                        <div className='img-2' style={{backgroundColor: "#0B1C26"}}></div>
                    </section>
                ) : (
                    null
                )}
                {!loading && products.length ? (
                    <section className='products'>
                        {products.map((product) => (
                            <div key={product.product_id} className={product.name === 'VB Spark' || product.name === 'VB Evo' ? 'img-2' : 'img'} style={{ backgroundImage: `url(${product.img})` }}>
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                                <Link to={`/product/${product.product_id}`}><button className='btn-product'>Buy it</button></Link>
                            </div>
                        ))}
                    </section>
                ):(
                    null
                )}
            <section className='banner'>
                <img src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' alt='banner-voltbike' className='banner-img' />
            </section>
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home;