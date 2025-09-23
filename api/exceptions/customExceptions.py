#Clases de Excepciones personalizadas

class InvalidDataInputException(Exception):
     """
     Excepcion para manejar entradas de datos no validas
     """

     def __init__(self, message="Entrada de datos no valida.", status_code=400):
         self.message = message
         self.status_code = status_code
         super().__init__(self.message)

class UnauthorizedException(Exception):
    """
    Excepcion para manejar accesos no autorizados
    """

    def __init__(self, message="Acceso no autorizado. Revisa tus credenciales", status_code=401):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)