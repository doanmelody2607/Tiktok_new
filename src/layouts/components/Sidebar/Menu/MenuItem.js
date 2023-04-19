import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { RedDotIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon, isNotify = false }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to} end>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
            {isNotify && (
                <span className={cx('dot')}>
                    <RedDotIcon />
                </span>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
    isNotify: PropTypes.bool,
};

export default MenuItem;
