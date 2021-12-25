import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import Link from '@mui/material/Link';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

ProductMenu.propTypes = {
    
};

function ProductMenu(props) {
    const useStyles = makeStyles({
        root: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',

            padding: 0,
            listStyleType: 'none',

            '& > li':{
                padding: '2px 4px',
            },
            '& > li > a':{
                color: '#aaaaaa',
                textDecoration: 'none'
            },
            '& > li > a.active':{
                color: '#1976d2',
                textDecoration: 'underline'
            }
        },

    })
    const classes = useStyles();

    const {url} = useRouteMatch();
    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>Description</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>Additional Information</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>Reviews</Link>
            </li>
        </Box>
    );
}

export default ProductMenu;