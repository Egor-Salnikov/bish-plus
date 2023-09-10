from datetime import datetime, timedelta

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from passlib.context import CryptContext

import jwt

from utils.edu_tatar_login import get_info

from utils.db import SessionLocal
from models import User


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
secret_key = "SECRET_KEY"


def create_access_token(u_id):
    payload = {
        "sub": str(u_id),
        "exp": datetime.utcnow() + timedelta(days=30)
    }
    access_token = jwt.encode(payload, secret_key, algorithm="HS256")
    return access_token


def create_user(user_data):
    res = get_info(user_data["email"], user_data["password"])
    user_data["password"] = pwd_context.hash(user_data["password"])
    user_data["role"] = res["role"]
    user_data["name"] = res["name"]
    return user_data


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        user_id = payload["sub"]
        # Fetch the user from the database based on the user_id
        user = SessionLocal().query(User).filter(User.id == int(user_id)).first()
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
