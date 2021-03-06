import {
  Banner,
  Card,
  DisplayText,
  Form,
  FormLayout,
  Frame,
  Layout,
  Page,
  PageActions,
  TextField,
  Toast,
} from '@shopify/polaris';
import store from 'store-js';
import React, { useState, useEffect } from "react"
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;


const EditProduct = () => {
    const [state, setState] = useState({
        discount: '',
        price: '',
        variantId: '',
        'showToast': false
    });
    const { discount, price, variantId } = state;
    const handleChange = (value) => {
        setState({ ...state, discount: value });
    };

    const itemToBeConsumed = () => {
        const item = store.get('item');
        const price = item.variants.edges[0].node.price;
        const variantId = item.variants.edges[0].node.id;
        const discounter = price * 0.1;
        const discount = (price - discounter).toFixed(2)
        setState({ discount, price, variantId });
    };

    useEffect(() => {
      itemToBeConsumed();
    }, []);

    return (
      <Mutation
        mutation={UPDATE_PRICE}>
          {(handleSubmit, {error, data}) => {

            const showError = error && (
              <Banner status="critical">{error.message}</Banner>
            );

            const showToast = data && data.productVariantUpdate && (
              <Toast
                content="Sucessfully updated"
                onDismiss={() => setState({ ...state, showToast: false })}
              />
            );

            return (
              <Frame>
                <Page>
                  <Layout>
                    {showToast}
                    <Layout.Section>
                      {showError}
                    </Layout.Section>                  
                    <Layout.Section>
                      <DisplayText size="large">{"name"}</DisplayText>
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
                                const productVariableInput = {
                                    id: variantId,
                                    price: discount,
                                };
                                handleSubmit({
                                variables: { input: productVariableInput },
                                });

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
              </Frame>
          )}}
      </Mutation>        
      );
}


export default EditProduct;