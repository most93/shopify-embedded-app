import { EmptyState, Layout, Page, TextStyle } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import React, { useState, useContext } from "react"
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = () => {
    const [open, setOpen] = useState(false);
    const emptyState = !store.get('ids');

    const handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
        setOpen(false)
        store.set('ids', idsFromResources);
    };

    return (
        <Page>
            <TitleBar
                primaryAction={{
                    content: 'Select products',
                    onAction: () => setOpen(true),
                }}
            />
            <ResourcePicker
                resourceType="Product"
                showVariants={false}
                open={open}
                onSelection={(resources) => handleSelection(resources)}
                onCancel={() => setOpen(false)}
            />
            {emptyState ? (
            <Layout>
                <EmptyState
                    heading="Discount your products temporarily"
                    action={{
                        content: 'Select products',
                        onAction: () => setOpen(true),
                    }}
                    image={img}
                >
                    <p>Select products to change their price temporarily.</p>
                </EmptyState>
            </Layout>
            ) : (
            <ResourceListWithProducts />
            )}
        </Page>
    );
}


export default Index;
