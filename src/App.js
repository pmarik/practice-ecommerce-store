import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header.component';
//import HomePage from './pages/homepage/Homepage.component';
//import ShopPage from './pages/shop/ShopPage.component';
//import CheckoutPage from './pages/checkout/Checkout.component';
//import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { GlobalStyle } from './global.styles';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import Spinner from './components/spinner/spinner.component';

const HomePage = lazy(() => import('./pages/homepage/Homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/ShopPage.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/Checkout.component'))
const SignInandSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))

const App = ({ setCurrentUser, currentUser }) => {

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        });
      }
      setCurrentUser(userAuth);
    });
  }, [setCurrentUser])


    return (
      <div>
        <GlobalStyle />
        <Header/> 
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInandSignUpPage />) } /> 
            </Suspense>
          </ErrorBoundary>
        </Switch> 
      </div>
    );
 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
