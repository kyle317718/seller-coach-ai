const port = 5003;

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
  console.log('환경 변수:');
  console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? '설정됨' : '설정되지 않음');
}); 