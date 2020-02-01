import {
    Button,
    Card,
    Form,
    FormLayout,
    SettingToggle,
    Layout,
    Page,
    Stack,
    TextField,
    TextStyle,
} from '@shopify/polaris';
import React, { useState, useContext } from "react"


const AnnotatedLayout = () => {
    const [discount, setDiscount] = useState("10%");
    const [enabled, setEnabled] = useState(false);

    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

    const handleSubmit = () => {
        setDiscount(discount);
        console.log('submission', discount);
    };

    const handleChange = (value) => {
        setDiscount(value);
    };
  
    const  handleToggle = () => {
        setEnabled(!enabled)
    };

    return (
        <Page>
          <Layout>
            <Layout.AnnotatedSection
              title="Default discount"
              description="Add a product to Sample App, it will automatically be discounted."
            >
              <Card sectioned>
                <Form onSubmit={handleSubmit}>
                  <FormLayout>
                    <TextField
                      value={discount}
                      onChange={(value) => handleChange(value)}
                      label="Discount percentage"
                      type="discount"
                    />
                    <Stack distribution="trailing">
                      <Button primary submit>
                        Save
                      </Button>
                    </Stack>
                  </FormLayout>
                </Form>
              </Card>
            </Layout.AnnotatedSection>

            <Layout.AnnotatedSection
                title="Price updates"
                description="Temporarily disable all Sample App price updates">

                <SettingToggle
                    action={{
                        content: contentStatus,
                        onAction: handleToggle,
                    }}
                    enabled={enabled}
                    >This setting is{' '}
                    <TextStyle variation="strong">{textStatus}</TextStyle>.
                </SettingToggle>
            </Layout.AnnotatedSection>

          </Layout>
        </Page>
      );
}


export default AnnotatedLayout;