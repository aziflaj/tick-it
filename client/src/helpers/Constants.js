let baseUrl = '';
if (process.env.ENV === 'development') {
  baseUrl = 'http://localhost:5000';
}

export default baseUrl;
