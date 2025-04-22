const axios = require('axios');
require('dotenv').config(); // 환경 변수 로드

async function testMCP() {
  try {
    // MCP 서버 연결 테스트
    const testResponse = await axios.get('http://localhost:3000/api/test');
    console.log('MCP Test Response:', testResponse.data);
    
    // MCP 서버를 통해 메시지 전송 테스트
    const messageResponse = await axios.post('http://localhost:3000/api/message', {
      message: "How can I improve my product listings?",
      context: [] // 선택적 이전 대화 컨텍스트
    });
    
    console.log('MCP Response:');
    console.log(messageResponse.data);
    
    // 새로 추가된 엔드포인트 테스트
    const sellercoachResponse = await axios.get('http://localhost:3000/api/sellercoach');
    console.log('Sellercoach API Response:', sellercoachResponse.data);
  } catch (error) {
    console.error('Error testing MCP:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

testMCP();