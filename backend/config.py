from decouple import config
import os
BASE_DIR= os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATION = config('SQLALCHEMY_TRACK_MODIFICATION',cast=bool)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", 'postgresql://postgres:M4ss1m0M4r0ng1u@localhost/trasportiproject')
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///dev.db")
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:M4ss1m0M4r0ng1u@localhost/trasportiproject'
    
    DEBUG = True

# class DevConfig(Config):
#     pass
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///dev.db")
    # DEBUG = True
    # SQLALCHEMY_ECHO=True


class ProdConfig(Config):
    pass
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///prod.db")
    # DEBUG = os.getenv("DEBUG", False)
    # SQLALCHEMY_ECHO = os.getenv("ECHO", False)
    # SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)


# class TestConfig(Config):
#     pass
    # SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
    # SQLALCHEMY_ECHO = False
    # TESTING = True

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:M4ss1m0M4r0ng1u@localhost/trasportiproject"
    SQLALCHEMY_ECHO = False
    TESTING = True