import { LightningElement, api } from 'lwc';
import getFields from '@salesforce/apex/FieldDescriptionController.getFields';

export default class ListFields extends LightningElement {
  @api objectApiName;
  @api selectedFields = [];

  @api
  get fields() {
    return this.selectedFields.map((field) => {
      return {
        value: field,
        name: this.getFieldLabel(field),
      };
    });
  }

  connectedCallback() {
    if (this.objectApiName) {
      this.fetchFields();
    }
  }

  async fetchFields() {
    try {
      const response = await getFields({ objectApiName: this.objectApiName });
      this.selectedFields = response.fields.map((field) => field.Name);
    } catch (error) {
      console.error('Error fetching fields: ', error);
    }
  }

  getFieldLabel(fieldName) {
    const field = this.getField(fieldName);
    return field ? field.Label : '';
  }

  getField(fieldName) {
    return this.objectApiName
      ? this.getFieldsMetadata().find((field) => field.Name === fieldName)
      : null;
  }

  getFieldsMetadata() {
    return (
      this.objectApiName &&
      JSON.parse(JSON.stringify(this.objectInfo.fields))
    );
  }

  get objectInfo() {
    return (
      this.objectApiName &&
      JSON.parse(JSON.stringify(this.template.querySelector('c-object-info').data))
    );
  }
}
