import {
    Card,
    DisplayText,
    Form,
    FormLayout,
    Layout,
    Page,
    PageActions,
    TextField
  } from '@shopify/polaris';
import store from 'store-js';
import React, { useState, useEffect } from "react"


const EditProduct = () => {
    const [state, setState] = useState({
        discount: '',
        price: '',
        variantId: ''
    });
    const { name, price, discount, variantId } = state;
    const handleChange = (value) => {
        setState({ discount: value });
    };

    const itemToBeConsumed = () => {
        const item = store.get('item');
        const price = item.variants.edges[0].node.price;
        const variantId = item.variants.edges[0].node.id;
        const discounter = price * 0.1;
        setState({ price, variantId });
        return (price - discounter).toFixed(2);
    };

    useEffect(() => {
        setState({ discount: itemToBeConsumed() });
    }, []);

    return (
        <Page>
          <Layout>
            <Layout.Section>
              <DisplayText size="large">{name}</DisplayText>
              <Form>
                <Card sectioned>
                  <FormLayout>
                    <FormLayout.Group>
                      <TextField
                        prefix="$"
                        value={price}
                        disabled={true}
                        label="Original price"
                        type="price"
                      />
                      <TextField
                        prefix="$"
                        value={discount}
                        onChange={(value) => handleChange(value)}
                        label="Discounted price"
                        type="discount"
                      />
                    </FormLayout.Group>
                    <p>
                      This sale price will expire in two weeks
                    </p>
                  </FormLayout>
                </Card>
                <PageActions
                  primaryAction={[
                    {
                      content: 'Save',
                      onAction: () => {
                        console.log('submitted');
                      }
                    }
                  ]}
                  secondaryActions={[
                    {
                      content: 'Remove discount'
                    }
                  ]}
                />
              </Form>
            </Layout.Section>
          </Layout>
        </Page>
      );

}


export default EditProduct;