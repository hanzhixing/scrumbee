import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragPreviewLayer from './DragPreviewLayer';
import Panel from './Panel';
import Card from './Card';
import cx from './index.m.scss';

class StandupMeeting extends PureComponent {
    static propTypes = {
        stories: PropTypes.arrayOf(PropTypes.object),
    };

    componentDidMount() {
        document.body.style.background = '#e2e4e6';
    }

    componentWillUnmount() {
        document.body.style.background = 'none'
    }

    render() {
        const {stories} = this.props;

        return (
            <DndProvider backend={HTML5Backend}>
                <div className={cx('root')}>
                    <DragPreviewLayer />
                    {
                        stories.map(o => (
                            <Panel key={o.id} {...o} />
                        ))
                    }
                </div>
            </DndProvider>
        );
    }

}

export default StandupMeeting;
