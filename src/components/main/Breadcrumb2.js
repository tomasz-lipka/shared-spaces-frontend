import { Link, useLocation } from 'react-router-dom';

function Breadcrumb2() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return (
            <span key={path}>
                <Link to={path}>{segment}</Link>
                {index < pathSegments.length - 1 && ' / '}
            </span>
        );
    });
    return <div>{breadcrumbs}</div>;
};


export default Breadcrumb2;