import React from 'react';

import { CommentsLoader } from '../js/utils';

class ScriptsLoader extends React.Component {

    componentDidMount() {
        CommentsLoader();
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default ScriptsLoader;