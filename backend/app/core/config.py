import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_TITLE: str = "Food Delivery Application"
    PROJECT_DESCRIPTION: str = "A modern food delivery application"
    PROJECT_VERSION: str = "1.0.0"
    DATABASE_HOST: str = os.environ.get("DATABASE_HOST", "localhost")
    DATABASE_PORT: int = os.environ.get("DATABASE_PORT", 5432)
    DATABASE_USERNAME: str = os.environ.get("DATABASE_USERNAME", "postgres")
    DATABASE_PASSWORD: str = os.environ.get("DATABASE_PASSWORD", "password")
    DATABASE_NAME: str = os.environ.get("DATABASE_NAME", "food_delivery")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "secret_key")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()