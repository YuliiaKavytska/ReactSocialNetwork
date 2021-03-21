import React from 'react'
import Preloader from "../common/Preloader/Preloader"

// суспенс это обертка. пока ленивая компонента загружается - показываей прелоудер.
// это мы вынесли в хок, потому что этим нужно оборачивать все ленивые компоненты

function LazyLoading<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    return (props: WCP) =>  <React.Suspense fallback={<Preloader/>}>
        <WrappedComponent {...props} />
    </React.Suspense>
}

export  default LazyLoading