from extensions.database import db_session
from models.user import User
import bcrypt
from flask_jwt_extended import create_access_token


def is_User_Exists(email):
    return db_session.query(User).filter(User.email == email).first()


def registerUser(email, password):

    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)

    new_user = User(email=email, password=hash.decode("utf-8"))
    db_session.add(new_user)
    db_session.commit()

    return create_access_token(identity=new_user.email)


def validateData(data, schema):
    try:
        return schema(**data)
    except:
        return False


def loginUser(email, password):
    user = db_session.query(User).filter(User.email == email).first()
    if not user:
        return None
    bytes = password.encode("utf-8")
    hash = user.password.encode("utf-8")
    if bcrypt.checkpw(bytes, hash):
        return create_access_token(identity=user.email)
    return None
