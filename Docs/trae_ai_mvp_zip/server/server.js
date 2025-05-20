
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', (req, res) => {
  const { query } = req.body;
  const mockResponse = {
    result: `분석 결과: "${query}"에 대한 전략은 더 나은 광고 타겟팅입니다.`,
  };
  res.json(mockResponse);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
