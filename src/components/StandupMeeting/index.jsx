import React, {PureComponent} from 'react';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragPreviewLayer from './DragPreviewLayer';
import Panel from './Panel';
import cx from './index.module.scss';

class StandupMeeting extends PureComponent {
    componentDidMount() {
        document.body.style.background = '#e2e4e6';
    }

    componentWillUnmount() {
        document.body.style.background = 'none';
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
