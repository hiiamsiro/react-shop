import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './Components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Indie Pop',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/e/7/9/0/e790828a705fee72c5d91b66c92c8cd4.jpg'
        },
        {
            id: 2,
            name: 'Dance Pop',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/c/9/3/9c934b274286700e4c122b0999d7a77c.jpg'
        },
        {
            id: 3,
            name: 'Pop Rising',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/9/c/8/19c85c43ceab252bf1e8a0e8ed6c058f.jpg'
        }
    ];
    return (
        <div>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;