import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import { HashtagIcon, MusicIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function DiscoverItem({ icon, title }) {
    return (
        <div className={cx('discover')}>
            {icon === 'hashtag' && <HashtagIcon className={cx('discover-icon')} />}
            {icon === 'music' && <MusicIcon className={cx('discover-icon')} />}
            <p className={cx('discover-title')}>{title}</p>
        </div>
    );
}

DiscoverItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default DiscoverItem;
