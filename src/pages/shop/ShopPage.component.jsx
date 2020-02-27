import React, { useEffect } from 'react';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { Route } from 'react-router-dom';
import CollectionPageContainer from '../collection/collection.container';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';



const ShopPage = ({ fetchCollectionsStartAsync, match }) => {

    useEffect(() => {
        fetchCollectionsStartAsync();
    }, [fetchCollectionsStartAsync])

        return(
        <div className="shop-page">
            <Route
                exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
                 />

            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer} 
                />
        </div>
        )
    
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
   

export default connect(null, mapDispatchToProps)(ShopPage);