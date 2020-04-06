import React, {PureComponent, createRef} from 'react';
import Snap from 'snapsvg-cjs';
import {ReactComponent as Bee} from './bee.svg';
import cx from './index.module.scss';

class Logo extends PureComponent {
    $ref = createRef();

    componentDidMount() {
        const logo = Snap(this.$ref.current);

        const tentacle = logo.selectAll('circle');

        const blink = color => {
            const fill = color === 'green' ? 'yellow' : 'green';

            tentacle.animate({fill}, 1000, () => blink(fill));
        };

        blink();
    }

    render() {
        return (
            <div className={cx('root')}>
                <h1>Scrum Bee</h1>
                <Bee ref={this.$ref} />
            </div>
        );
    }
}

export default Logo;
