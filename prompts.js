
class promptTemplate {
    constructor({ template, inputVariable }) {
      this.template = template;
      this.inputVariable = inputVariable;
    }
  
    generatePrompt(question) {
      return this.template.replace('{question}', question);
    }
  }
  
  export { promptTemplate };