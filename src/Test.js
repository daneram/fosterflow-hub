/**
 * Test file created via MCP
 * This demonstrates automated file creation and Git commit features
 */

function testFunction() {
  console.log('This is a test function');
  return 'Test successful';
}

const testObject = {
  name: 'Test Object',
  value: 42,
  isActive: true,
  methods: {
    getData() {
      return this.value;
    }
  }
};

export { testFunction, testObject }; 