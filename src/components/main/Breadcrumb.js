import { Link } from 'react-router-dom';
import Config from '../../Config';

function Breadcrumb({ to, display, reload }) {

    const handleClick = () => {
        if (to === '') {
            reload();
        }
    };

    return (
        <div>
            <Link to={to} className='breadcrumb' onClick={handleClick}>
                {Config.titleSymbol}{Config.blankSymbol}{display}{Config.blankSymbol}
            </Link>
        </div>
    );
}

export default Breadcrumb