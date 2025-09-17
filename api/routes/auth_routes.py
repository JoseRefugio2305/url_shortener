from flask import Blueprint, request, jsonify
from services.auth_services import is_User_Exists, registerUser, validateData, loginUser
from schemas.auth_schema import (
    UserRegLogSchema as URLS,
    UserRegisterResponseSchema as URRS,
    UserLoginResponseSchema as ULRS,
)
from exceptions.customExceptions import InvalidDataInputException, UnauthorizedException

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    user_data = validateData(request.json, URLS)
    if not user_data:
        raise InvalidDataInputException()
        # return jsonify({"message": "Revisa la información ingresada."}), 400

    if is_User_Exists(user_data.email):
        return jsonify({"message": "Ya existe un usuario con este email."}), 400

    registerUser(user_data.email, user_data.password)

    return URRS().model_dump(), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    user_data = validateData(request.json, URLS)
    if not user_data:
        raise InvalidDataInputException()
        # return jsonify({"message": "Revisa la información ingresada."}), 400

    token = loginUser(user_data.email, user_data.password)
    if not token:
        raise UnauthorizedException()
    return ULRS(jwtToken=token).model_dump(), 200
