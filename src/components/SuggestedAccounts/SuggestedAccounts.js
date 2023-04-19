import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import DiscoverItem from './DiscoverItem';
import { discoveries } from '~/layouts/components/Sidebar/data-sidebar';

const cx = classNames.bind(styles);

function SuggestedAccounts({ type, label, items = [] }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {type === 'account'
                ? items.map((item) => <AccountItem key={item.id} data={item} />)
                : discoveries.map((data, index) => (
                      <DiscoverItem key={index} icon={data.icon} title={data.title} />
                  ))}

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array,
};

export default SuggestedAccounts;
