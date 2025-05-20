from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
from dotenv import load_dotenv
import httpx
import json
import logging
from fastapi.responses import JSONResponse
import asyncio
# MCP 플러그인 import
try:
    import mcp_tavily
except ImportError:
    mcp_tavily = None
try:
    import mcp_youtube_transcript
except ImportError:
    mcp_youtube_transcript = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(override=True)  # Force reload of .env file
api_key = os.getenv("DEEPSEEK_API_KEY")
api_url = os.getenv("SELLERCOACH_API_URL", "https://api.deepseek.com")  # Set default URL
logger.info(f"API Key loaded: {api_key}")  # Log the actual key for debugging
logger.info(f"API URL loaded: {api_url}")

if not api_key:
    logger.error("DeepSeek API key is not set in .env file")
    raise Exception("DeepSeek API key not configured")

if not api_url:
    logger.error("SellerCoach API URL is not set in .env file")
    raise Exception("SellerCoach API URL not configured")

app = FastAPI()

@app.get("/mcp-tavily-search")
async def mcp_tavily_search(query: str):
    if not mcp_tavily:
        return {"error": "mcp-tavily 모듈이 설치되어 있지 않습니다."}
    try:
        result = mcp_tavily.search(query)
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}

@app.get("/mcp-youtube-transcript")
async def mcp_youtube_transcript_api(url: str):
    if not mcp_youtube_transcript:
        return {"error": "mcp-youtube-transcript 모듈이 설치되어 있지 않습니다."}
    try:
        transcript = mcp_youtube_transcript.get_transcript(url)
        return {"transcript": transcript}
    except Exception as e:
        return {"error": str(e)}

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

class MCPRequest(BaseModel):
    command: str
    payload: Dict[str, Any]

class AnalyzeRequest(BaseModel):
    text: str
    image: Optional[str] = None

def prepare_prompt(command: str, payload: Dict[str, Any]) -> str:
    if command == "analyze":
        message = payload.get('message', '')
        analysis_type = payload.get('type', 'product_analysis')

        if not message:
            raise HTTPException(
                status_code=400,
                detail="Message is required in the payload"
            )

        prompt = f"""다음 상품의 핵심 정보를 분석해주세요. 반드시 아래 양식을 그대로 따라주세요:

상품: {message}

### 🔍 시장 분석
- 소비자 트렌드: [구체적인 트렌드 설명]
- 수요 규모: [구체적인 수치]
- 현재 시장 판매가 범위: [최저가]-[최고가]
- 플랫폼별 평균 판매가:
  * 네이버: [가격]원
  * 쿠팡: [가격]원
  * 11번가: [가격]원
- 경쟁 상품: [주요 경쟁 상품 리스트]
- 주요 판매 플랫폼: [플랫폼 리스트]

### 🧑‍🎯 판매 전략
- 주요 타겟층
- 타겟층의 니즈
- 마케팅 포인트
- 플랫폼별 마케팅 전략

### ✍️ 상세페이지 개선 제안
- 이미지 구성
- 영상 추천
- 설명 방식
- 추천 키워드

### 🪄 차별화 전략
- 경쟁 제품과 비교한 차별점
- 강조할 기능/디자인 요소

### 🇰🇷 대한민국 시장 매출 규모
- 해당 카테고리의 연간 시장 규모
- 성장률
- 주요 브랜드 점유율

### 🛒 판매 전 준비 내용
- 인증/AS 정책
- 물류
- 상세페이지 구성 요소
- 광고 키워드 준비

### 💰 수익성 분석
- 예상 마진율
- 초기 투자 비용
- 손익분기점 예측
- 월별 예상 매출

### 📊 경쟁사 벤치마킹
- 주요 경쟁사 TOP 3
- 경쟁사 가격 전략
- 경쟁사 마케팅 전략
- 성공/실패 사례 분석

### 🎯 시즌별 판매 전략
- 성수기/비수기 분석
- 시즌별 프로모션 제안
- 특별 행사 기획
- 시즌별 마케팅 포인트

### ⚠️ 리스크 관리
- 예상되는 문제점
- 고객 불만 대응 방안
- 재고 관리 전략
- 위기 대응 매뉴얼

각 항목은 실제 셀러가 활용할 수 있도록 구체적이고 실용적인 내용으로 작성해주세요.
특히 가격 정보와 수치 데이터는 구체적인 범위나 금액으로 제시해주세요."""
        return prompt
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown command: {command}"
        )

@app.get("/")
async def root():
    return {"message": "Server is running"}

@app.post("/mcp")
async def handle_mcp(request: MCPRequest):
    try:
        # API 키 확인
        if not api_key:
            logger.error("API key is missing")
            return {"error": "API 키가 설정되지 않았습니다."}

        # 요청 데이터 로깅
        logger.info(f"Received request: {request.dict()}")
        
        prompt = prepare_prompt(request.command, request.payload)
        logger.info(f"Prepared prompt: {prompt[:100]}...")  # 처음 100자만 로깅

        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                # API 요청 데이터 준비
                request_data = {
                    "model": "deepseek-chat",
                    "messages": [
                        {
                            "role": "system",
                            "content": "당신은 전문적인 이커머스 마케팅 전문가입니다."
                        },
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    "max_tokens": 4000,
                    "temperature": 0.7
                }
                
                # 요청 정보 로깅
                logger.info(f"Sending request to: {api_url}/v1/chat/completions")
                logger.info(f"Request headers: Authorization: Bearer {api_key[:10]}...")
                logger.info(f"Request data: {json.dumps(request_data, ensure_ascii=False)[:200]}")

                response = await client.post(
                    f"{api_url}/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    },
                    json=request_data,
                    timeout=30.0
                )
                
                # 응답 로깅
                logger.info(f"Response status: {response.status_code}")
                logger.info(f"Response headers: {dict(response.headers)}")
                
                response_text = response.text
                logger.info(f"Raw response: {response_text[:200]}")  # 처음 200자만 로깅

                if response.status_code != 200:
                    logger.error(f"API Error: {response_text}")
                    return {
                        "error": "API 요청 중 오류가 발생했습니다.",
                        "details": response_text
                    }

                try:
                    result = response.json()
                    logger.info(f"Parsed response: {json.dumps(result, ensure_ascii=False)[:200]}")
                    
                    if "choices" not in result or not result["choices"]:
                        logger.error("Invalid API response format")
                        return {
                            "error": "API 응답 형식이 올바르지 않습니다.",
                            "details": str(result)
                        }
                    
                    analysis_text = result["choices"][0]["message"]["content"]
                    
                    return {
                        "result": analysis_text,
                        "analysis": analysis_text,
                        "actionPlan": {
                            "summary": "맞춤형 판매 전략을 수립하여 시장 진입을 준비하세요.",
                            "tasks": [
                                {"task": "상품 상세페이지 작성", "done": False},
                                {"task": "경쟁사 가격 분석", "done": False},
                                {"task": "초기 마케팅 계획 수립", "done": False}
                            ],
                            "goal": "첫 달 목표: 판매 20건 / 수익 100만원",
                            "resources": [
                                {"title": "상세페이지 작성 가이드", "url": "#"},
                                {"title": "마케팅 시작하기", "url": "#"}
                            ]
                        }
                    }
                except json.JSONDecodeError as e:
                    logger.error(f"JSON Decode Error: {str(e)}")
                    return {"error": "API 응답을 처리하는 중 오류가 발생했습니다."}

            except httpx.RequestError as e:
                logger.error(f"Request error: {str(e)}")
                return {"error": f"API 요청 중 오류가 발생했습니다: {str(e)}"}
            except httpx.TimeoutException as e:
                logger.error(f"Timeout error: {str(e)}")
                return {"error": "API 요청 시간이 초과되었습니다."}

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return {"error": f"예기치 않은 오류가 발생했습니다: {str(e)}"}

@app.get("/test-api")
async def test_api():
    if not api_key:
        logger.error("API key is not configured")
        raise HTTPException(status_code=500, detail="DeepSeek API key not configured")

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            test_request = {
                "model": "deepseek-chat",
                "messages": [
                    {
                        "role": "system",
                        "content": "당신은 전문적인 이커머스 마케팅 전문가입니다."
                    },
                    {
                        "role": "user",
                        "content": "안녕하세요"
                    }
                ],
                "temperature": 0.7,
                "max_tokens": 100
            }
            
            # API 요청 전 로깅
            logger.info(f"Sending test request to DeepSeek API with key: {api_key[:10]}...")
            
            response = await client.post(
                f"{api_url}/v1/chat/completions",
                json=test_request,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                timeout=60.0
            )
            
            response_text = response.text
            logger.info(f"Test API Response status: {response.status_code}")
            logger.info(f"Response headers: {response.headers}")
            logger.info(f"Response text: {response_text}")
            
            if response.status_code == 401:
                error_msg = "API Key authentication failed"
                logger.error(error_msg)
                return {"error": error_msg}
            elif response.status_code == 429:
                error_msg = "Rate limit exceeded"
                logger.error(error_msg)
                return {"error": error_msg}
            elif response.status_code != 200:
                error_msg = f"API error: {response_text}"
                logger.error(error_msg)
                return {"error": error_msg}
            
            try:
                result = response.json()
                logger.info(f"Parsed test response: {result}")
                return {
                    "status": response.status_code,
                    "headers": dict(response.headers),
                    "result": result
                }
            except json.JSONDecodeError:
                error_msg = f"Invalid JSON response: {response_text}"
                logger.error(error_msg)
                return {
                    "error": error_msg
                }
                
    except Exception as e:
        error_msg = f"Test API Error: {str(e)}"
        logger.error(error_msg)
        return {"error": error_msg}

@app.post("/api/analyze")
async def analyze_product(request: dict):
    try:
        # 필수 필드 검증
        product_name = request.get('product_name', '')
        step_index = request.get('step_index', 0)  # 현재 분석 단계
        
        if not product_name:
            raise HTTPException(status_code=400, detail="상품명은 필수 입력 항목입니다.")

        # 분석 단계별 프롬프트 설정
        analysis_steps = [
            {
                "title": "시장 분석",
                "prompt": f"""다음 상품의 시장 분석을 상세하게 해주세요:

상품: {product_name}

다음 항목들을 구체적인 수치와 함께 분석해주세요:

1. 소비자 트렌드
- 최근 2-3년간의 트렌드 변화
- 주요 소비자 니즈
- 시장 성장 동인

2. 시장 규모
- 전체 시장 규모 (금액)
- 연간 성장률
- 시장 점유율 Top 3

3. 가격 분석
- 시장 평균 가격
- 가격 범위 (최저가-최고가)
- 플랫폼별 평균 가격

4. 경쟁 현황
- 주요 경쟁사 현황
- 경쟁 강도
- 시장 진입 장벽

각 항목에 대해 구체적인 수치와 데이터를 포함해 설명해주세요."""
            },
            {
                "title": "제품 분석",
                "prompt": f"""다음 상품의 제품 특성을 상세하게 분석해주세요:

상품: {product_name}

다음 항목들을 구체적으로 분석해주세요:

1. 제품 핵심 가치
- 주요 기능 및 특징
- 소비자 혜택
- 차별화 포인트

2. 제품 경쟁력
- 경쟁사 대비 장점
- 개선이 필요한 부분
- 잠재적 위험 요소

3. 품질 및 신뢰성
- 품질 인증 현황
- AS 및 서비스 체계
- 소비자 신뢰도

4. 제품 수명주기
- 현재 단계
- 향후 발전 가능성
- 대체제 위험

구체적인 예시와 데이터를 포함하여 설명해주세요."""
            },
            {
                "title": "가격 전략",
                "prompt": f"""다음 상품의 가격 전략을 상세하게 분석해주세요:

상품: {product_name}

다음 항목들을 구체적인 수치와 함께 분석해주세요:

1. 가격 포지셔닝
- 적정 판매가 범위
- 경쟁사 가격 비교
- 가격 차별화 전략

2. 수익성 분석
- 예상 마진율
- 손익분기점
- 원가 구조

3. 가격 전략
- 초기 진입 가격
- 할인 프로모션 전략
- 시즌별 가격 전략

4. 가격 민감도
- 소비자 가격 민감도
- 가격 변동 대응 전략
- 가격 심리 분석

구체적인 수치와 실행 방안을 포함하여 설명해주세요."""
            },
            {
                "title": "마케팅 전략",
                "prompt": f"""다음 상품의 마케팅 전략을 상세하게 수립해주세요:

상품: {product_name}

다음 항목들을 구체적으로 분석해주세요:

1. 타겟 고객 분석
- 주요 타겟층 정의
- 구매 결정 요인
- 고객 페르소나

2. 채널 전략
- 주요 판매 채널
- 채널별 전략
- 옴니채널 구축 방안

3. 프로모션 계획
- 주요 프로모션 일정
- 채널별 프로모션
- 시즌별 이벤트

4. 콘텐츠 전략
- 핵심 메시지
- 콘텐츠 유형
- SNS 활용 방안

구체적인 실행 계획과 예상 효과를 포함하여 설명해주세요."""
            },
            {
                "title": "실행 계획",
                "prompt": f"""다음 상품의 구체적인 실행 계획을 수립해주세요:

상품: {product_name}

다음 항목들을 구체적으로 계획해주세요:

1. 판매 준비
- 필요 인증/허가
- 상세페이지 구성
- 재고 관리 계획

2. 런칭 계획
- 런칭 일정
- 초기 마케팅 계획
- 초기 물량 계획

3. 운영 계획
- 고객 서비스 체계
- 물류/배송 계획
- 품질 관리 방안

4. 리스크 관리
- 예상 문제점
- 대응 방안
- 모니터링 계획

구체적인 일정과 실행 단계를 포함하여 설명해주세요."""
            }
        ]

        # 현재 단계의 프롬프트 가져오기
        if step_index >= len(analysis_steps):
            raise HTTPException(status_code=400, detail="잘못된 분석 단계입니다.")
        
        current_step = analysis_steps[step_index]
        
        # API 호출 (최대 3번 재시도)
        max_retries = 3
        retry_count = 0
        last_error = None
        
        while retry_count < max_retries:
            try:
                analysis_result = await send_to_deepseek(current_step["prompt"], max_tokens=4000)
                
                # 응답 구조화
                response = {
                    "status": "success",
                    "step": step_index,
                    "total_steps": len(analysis_steps),
                    "current_title": current_step["title"],
                    "analysis": analysis_result,
                    "is_final": step_index == len(analysis_steps) - 1
                }
                
                return JSONResponse(content=response)
                
            except HTTPException as e:
                last_error = e
                if e.status_code != 504:  # 타임아웃이 아닌 경우 바로 에러 발생
                    raise e
                retry_count += 1
                await asyncio.sleep(1)  # 재시도 전 1초 대기
            except Exception as e:
                last_error = e
                retry_count += 1
                await asyncio.sleep(1)
        
        # 모든 재시도 실패 시
        if last_error:
            logger.error(f"Analysis failed after {max_retries} retries: {str(last_error)}")
            raise HTTPException(status_code=500, detail=f"분석 중 오류가 발생했습니다: {str(last_error)}")

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Unexpected error in analyze_product: {str(e)}")
        raise HTTPException(status_code=500, detail=f"예기치 않은 오류가 발생했습니다: {str(e)}")

async def send_to_deepseek(prompt: str, max_tokens: int = 4096) -> str:
    try:
        logger.info(f"Sending request to DeepSeek API. Prompt length: {len(prompt)}")
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system",
                    "content": "당신은 전문적인 이커머스 마케팅 전문가입니다."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": max_tokens,
            "temperature": 0.7
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{api_url}/v1/chat/completions",
                headers=headers,
                json=data
            )
            
            if response.status_code != 200:
                error_msg = f"DeepSeek API error: {response.status_code} - {response.text}"
                logger.error(error_msg)
                raise HTTPException(status_code=response.status_code, detail=error_msg)
            
            response_data = response.json()
            logger.info("Successfully received response from DeepSeek API")
            
            if "choices" not in response_data or not response_data["choices"]:
                raise HTTPException(status_code=500, detail="Invalid response format from DeepSeek API")
                
            return response_data["choices"][0]["message"]["content"]
            
    except httpx.TimeoutException:
        logger.error("Request to DeepSeek API timed out")
        raise HTTPException(status_code=504, detail="Request to DeepSeek API timed out")
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode JSON response: {e}")
        raise HTTPException(status_code=500, detail="Invalid response from DeepSeek API")
    except Exception as e:
        logger.error(f"Error in send_to_deepseek: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = 5001  # 고정 포트 사용
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=port,
        reload=True,
        log_level="info"
    )