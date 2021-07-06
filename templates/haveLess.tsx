import React from 'react';
import classNames from 'classnames/bind';
import styles from './{LessFileName}.module.less';

const cx = classNames.bind(styles);

const {FileName}: React.FC = () => {

    return (
        <article className={ cx('{FileName}') }>

        </article>
    );
};

export default {FileName};
