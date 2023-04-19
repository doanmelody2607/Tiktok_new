import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { CheckCircleIcon } from '../Icons';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

const AccountItem = memo(({ data, onClick }) => {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')} onClick={onClick}>
            <Image src={data.avatar} alt={data.nickname} className={cx('avatar')} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.nickname}</span>
                    {data.tick && <CheckCircleIcon className={cx('check')} />}
                </h4>
                <p className={cx('username')}>{data.full_name}</p>
            </div>
        </Link>
    );
});

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default AccountItem;
