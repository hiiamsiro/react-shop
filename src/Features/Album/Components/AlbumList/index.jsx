import React from 'react';
import PropTypes from 'prop-types';
import Album from '../Album';
import './style.css';

AlbumList.propTypes = {
    albumList: PropTypes.array,
};
AlbumList.defaultProps ={
    albumList: [],
}

function AlbumList(props) {
    const {albumList} = props;

    return (
        <ul className="album-list">
            {
                albumList.map(album => (
                    <li key={album.id}>
                        {/* gán album (props của Album) bằng album khi xài map */}
                        <Album album={album} /> 
                    </li>
                ))
            }
        </ul>
    );
}

export default AlbumList;