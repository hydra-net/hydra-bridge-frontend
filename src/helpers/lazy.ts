import React from 'react';

export const lazyWithPreload = (factory: any) => {
    const Component: any = React.lazy(factory);
    Component.preload = factory;
    return Component;
};