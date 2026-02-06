    import React from 'react';
    import Header from './Header';
    import Footer from './Footer';

    function Layout({ children, showHeader = true }) {
    return (
        <>
        {showHeader && <Header />}
        {children}
        <Footer />
        </>
    );
    }

    export default Layout;