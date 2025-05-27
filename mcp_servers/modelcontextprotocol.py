# MCPServer 및 tool 데코레이터 임시 구현
class MCPServer:
    def __init__(self, tools):
        self.tools = tools
    def run(self):
        print("[임시 MCPServer] 서버가 실행되었습니다. (실제 네트워크 기능 없음)")
        try:
            import time
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("서버 종료")

def tool(name, description):
    def decorator(func):
        func._tool_name = name
        func._tool_description = description
        return func
    return decorator
