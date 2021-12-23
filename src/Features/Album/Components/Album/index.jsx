import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

Album.propTypes = {
    album: PropTypes.object,
};
Album.defaultProps = {
    album: {},
}

function Album(props) {
    const {album} = props;

    return (
        <div className="album">
            <div className="album__img">
                {/* album này là từng cái album khi map bên AlbumList */}
                <img src={album.thumbnailURL} alt={album.name} /> 
            </div>
            <p className="album__name">{album.name}</p>
        </div>
    );
}

export default Album;