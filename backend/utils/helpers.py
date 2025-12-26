from fastapi.requests import Request

def get_client_ip(request: Request):
    if "X-Forwarded-For" in request.headers:
        return request.headers["X-Forwarded-For"]
    return request.client.host