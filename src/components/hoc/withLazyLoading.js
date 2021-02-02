import React from 'react';
import Preloader from "../common/Preloader/Preloader";

const LazyLoading = (Component) => {

    return (props) => ( <React.Suspense fallback={<Preloader/>}>
        <Component {...props} />
    </React.Suspense>);
}

export default LazyLoading;